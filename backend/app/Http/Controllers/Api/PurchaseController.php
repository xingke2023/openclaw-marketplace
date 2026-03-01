<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * List the authenticated user's purchases.
     */
    public function index(Request $request)
    {
        $purchases = $request->user()
            ->purchases()
            ->with('listing')
            ->latest()
            ->paginate(20);

        return response()->json($purchases);
    }

    /**
     * Purchase a free listing (price === 0).
     */
    public function store(Request $request)
    {
        $request->validate([
            'listing_id' => ['required', 'integer', 'exists:listings,id'],
        ]);

        $listing = \App\Models\Listing::findOrFail($request->listing_id);

        if ((float) $listing->price !== 0.0) {
            return response()->json(['message' => '该技能需要付款，请通过支付流程购买。'], 422);
        }

        if ($listing->status !== 'available') {
            return response()->json(['message' => '该技能当前不可购买。'], 422);
        }

        $purchase = $request->user()->purchases()->firstOrCreate(
            ['listing_id' => $listing->id],
            ['price_paid' => 0]
        );

        return response()->json($purchase->load('listing'), $purchase->wasRecentlyCreated ? 201 : 200);
    }

    /**
     * Check if user already purchased a listing.
     */
    public function check(Request $request, int $listingId)
    {
        $owned = $request->user()
            ->purchases()
            ->where('listing_id', $listingId)
            ->exists();

        return response()->json(['owned' => $owned]);
    }
}
