<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\PaymentOrder;
use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Stripe;
use Stripe\Webhook;

class StripeController extends Controller
{
    /**
     * Create a Stripe Checkout Session for a paid listing.
     */
    public function createCheckoutSession(Request $request): JsonResponse
    {
        $request->validate([
            'listing_id' => ['required', 'integer', 'exists:listings,id'],
        ]);

        $listing = Listing::findOrFail($request->listing_id);

        if ((float) $listing->price <= 0) {
            return response()->json(['message' => '该技能为免费，无需付款。'], 422);
        }

        if ($listing->status !== 'available') {
            return response()->json(['message' => '该技能当前不可购买。'], 422);
        }

        $alreadyOwned = $request->user()->purchases()
            ->where('listing_id', $listing->id)
            ->exists();

        if ($alreadyOwned) {
            return response()->json(['message' => '您已拥有该技能。'], 422);
        }

        Stripe::setApiKey(config('stripe.secret'));

        $frontendUrl = config('stripe.frontend_url');
        $amountFen = (int) round(floatval($listing->price) * 100);

        $session = StripeSession::create([
            'payment_method_types' => ['card', 'alipay', 'wechat_pay'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'cny',
                    'product_data' => [
                        'name' => $listing->name,
                        'description' => mb_substr($listing->description ?? '无描述', 0, 150),
                    ],
                    'unit_amount' => $amountFen,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => "{$frontendUrl}/listings/{$listing->slug}?payment=success",
            'cancel_url' => "{$frontendUrl}/listings/{$listing->slug}?payment=cancelled",
            'client_reference_id' => (string) $request->user()->id,
            'metadata' => [
                'user_id' => (string) $request->user()->id,
                'listing_id' => (string) $listing->id,
            ],
            'payment_method_options' => [
                'wechat_pay' => [
                    'client' => 'web',
                ],
            ],
        ]);

        PaymentOrder::create([
            'user_id' => $request->user()->id,
            'listing_id' => $listing->id,
            'stripe_session_id' => $session->id,
            'amount' => $listing->price,
            'status' => 'pending',
        ]);

        return response()->json([
            'url' => $session->url,
            'session_id' => $session->id,
        ]);
    }

    /**
     * Handle Stripe webhook events.
     */
    public function webhook(Request $request): JsonResponse
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $webhookSecret = config('stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $webhookSecret);
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $this->handleCheckoutCompleted($event->data->object);
        }

        return response()->json(['received' => true]);
    }

    private function handleCheckoutCompleted(object $session): void
    {
        $userId = $session->metadata->user_id ?? null;
        $listingId = $session->metadata->listing_id ?? null;

        if (! $userId || ! $listingId) {
            return;
        }

        $order = PaymentOrder::where('stripe_session_id', $session->id)->first();

        if ($order) {
            $order->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);
        }

        $pricePaid = $session->amount_total ? $session->amount_total / 100 : 0;

        Purchase::firstOrCreate(
            ['user_id' => $userId, 'listing_id' => $listingId],
            ['price_paid' => $pricePaid]
        );
    }
}
