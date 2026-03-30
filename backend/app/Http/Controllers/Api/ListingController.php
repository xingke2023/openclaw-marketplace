<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ListingController extends Controller
{
    /**
     * Public listing index with search/filter/sort/pagination.
     */
    public function index()
    {
        $query = Listing::query()
            ->where('status', 'available');

        if (request('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search): void {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (request('category') && request('category') !== 'all') {
            $query->where('category', request('category'));
        }

        $sort = request('sort', 'newest');
        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        return response()->json($query->paginate(12));
    }

    /**
     * Public single listing.
     */
    public function show(string $slug)
    {
        $listing = Listing::query()
            ->with('user:id,name,avatar_url,bio,website_url')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($listing);
    }

    /**
     * Public: related listings in same category.
     */
    public function related(string $slug)
    {
        $listing = Listing::query()->where('slug', $slug)->firstOrFail();

        $related = Listing::query()
            ->where('status', 'available')
            ->where('category', $listing->category)
            ->where('id', '!=', $listing->id)
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        return response()->json($related);
    }

    /**
     * Seller: list their own listings.
     */
    public function myListings(Request $request)
    {
        $listings = Listing::query()
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($listings);
    }

    /**
     * Seller: create a listing.
     */
    public function store(Request $request)
    {
        $this->requireSeller($request);

        $validated = $request->validate([
            'name'           => ['required', 'string', 'max:255'],
            'name_ja'        => ['nullable', 'string', 'max:255'],
            'price'          => ['required', 'numeric', 'min:0'],
            'description'    => ['nullable', 'string'],
            'description_ja' => ['nullable', 'string'],
            'image_url'      => ['nullable', 'url'],
            'category'       => ['required', 'string', 'max:100'],
            'status'         => ['in:available,draft,sold'],
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['slug'] = $this->uniqueSlug($validated['name']);
        $validated['status'] = $validated['status'] ?? 'available';

        $listing = Listing::create($validated);

        return response()->json($listing, 201);
    }

    /**
     * Seller: update their listing.
     */
    public function update(Request $request, int $id)
    {
        $listing = $this->findOwned($request, $id);

        $validated = $request->validate([
            'name'           => ['sometimes', 'string', 'max:255'],
            'name_ja'        => ['nullable', 'string', 'max:255'],
            'price'          => ['sometimes', 'numeric', 'min:0'],
            'description'    => ['nullable', 'string'],
            'description_ja' => ['nullable', 'string'],
            'image_url'      => ['nullable', 'url'],
            'category'       => ['sometimes', 'string', 'max:100'],
            'status'         => ['sometimes', 'in:available,draft,sold'],
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = $this->uniqueSlug($validated['name'], $listing->id);
        }

        $listing->update($validated);

        return response()->json($listing->fresh());
    }

    /**
     * Seller: delete their listing.
     */
    public function destroy(Request $request, int $id)
    {
        $listing = $this->findOwned($request, $id);
        $listing->delete();

        return response()->json(['message' => 'Listing deleted']);
    }

    private function requireSeller(Request $request): void
    {
        if (! $request->user()->is_seller) {
            abort(403, 'Only sellers can manage listings.');
        }
    }

    private function findOwned(Request $request, int $id): Listing
    {
        $this->requireSeller($request);

        return Listing::query()
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
    }

    private function uniqueSlug(string $name, ?int $excludeId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i = 1;

        while (
            Listing::query()
                ->where('slug', $slug)
                ->when($excludeId, fn ($q) => $q->where('id', '!=', $excludeId))
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
