<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SourcingRequest;
use Illuminate\Http\Request;

class SourcingRequestController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact' => ['required', 'string', 'max:255'],
            'model' => ['nullable', 'string', 'max:255'],
            'budget' => ['nullable', 'numeric'],
            'note' => ['nullable', 'string'],
        ]);

        $sourcingRequest = SourcingRequest::create($validated);

        return response()->json([
            'message' => 'Sourcing request submitted successfully',
            'data' => $sourcingRequest,
        ], 201);
    }
}
