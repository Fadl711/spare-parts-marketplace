<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Seller;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Get reviews for a seller
     */
    public function index($sellerId)
    {
        $seller = Seller::findOrFail($sellerId);
        
        $reviews = Review::where('seller_id', $sellerId)
            ->with('customer')
            ->latest()
            ->paginate(15);

        $reviews->getCollection()->transform(function ($review) {
            return [
                'id' => $review->id,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'customer' => [
                    'name' => $review->customer->name,
                ],
                'created_at' => $review->created_at->diffForHumans(),
            ];
        });

        // Calculate average rating
        $avgRating = Review::where('seller_id', $sellerId)->avg('rating');
        $totalReviews = Review::where('seller_id', $sellerId)->count();

        return response()->json([
            'data' => $reviews->items(),
            'meta' => [
                'average_rating' => round($avgRating, 1),
                'total_reviews' => $totalReviews,
                'pagination' => [
                    'current_page' => $reviews->currentPage(),
                    'last_page' => $reviews->lastPage(),
                    'per_page' => $reviews->perPage(),
                    'total' => $reviews->total(),
                ]
            ]
        ]);
    }

    /**
     * Create a review
     */
    public function store(Request $request)
    {
        $customer = $request->user();

        $validated = $request->validate([
            'seller_id' => 'required|exists:sellers,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        // Check if customer already reviewed this seller
        $existing = Review::where('customer_id', $customer->id)
            ->where('seller_id', $validated['seller_id'])
            ->first();

        if ($existing) {
            return response()->json([
                'error' => 'You have already reviewed this seller',
                'message' => 'Use update endpoint to modify your review'
            ], 409);
        }

        $review = Review::create([
            'customer_id' => $customer->id,
            'seller_id' => $validated['seller_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return response()->json([
            'message' => 'Review submitted successfully',
            'data' => [
                'id' => $review->id,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at->toIso8601String(),
            ]
        ], 201);
    }

    /**
     * Update a review
     */
    public function update(Request $request, $id)
    {
        $customer = $request->user();

        $review = Review::where('customer_id', $customer->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Review updated successfully',
            'data' => $review
        ]);
    }

    /**
     * Delete a review
     */
    public function destroy(Request $request, $id)
    {
        $customer = $request->user();

        $review = Review::where('customer_id', $customer->id)
            ->findOrFail($id);

        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully'
        ]);
    }
}
