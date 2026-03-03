<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\SourcingRequestController;
use App\Http\Controllers\Api\StripeController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Listing routes (public)
Route::get('/listings', [ListingController::class, 'index']);
Route::get('/listings/{slug}', [ListingController::class, 'show']);
Route::get('/listings/{slug}/related', [ListingController::class, 'related']);

// Sourcing routes
Route::post('/sourcing', [SourcingRequestController::class, 'store']);

// Stripe webhook (public, no auth)
Route::post('/stripe/webhook', [StripeController::class, 'webhook']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/become-seller', [AuthController::class, 'becomeSeller']);

    // Purchases
    Route::get('/purchases', [PurchaseController::class, 'index']);
    Route::post('/purchases', [PurchaseController::class, 'store']);
    Route::get('/purchases/check/{listingId}', [PurchaseController::class, 'check']);

    // Stripe checkout
    Route::post('/stripe/checkout', [StripeController::class, 'createCheckoutSession']);

    // Seller listing management
    Route::get('/my-listings', [ListingController::class, 'myListings']);
    Route::post('/listings', [ListingController::class, 'store']);
    Route::put('/listings/{id}', [ListingController::class, 'update']);
    Route::delete('/listings/{id}', [ListingController::class, 'destroy']);
});

// Post routes (index and show are public, rest require auth)
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
});
