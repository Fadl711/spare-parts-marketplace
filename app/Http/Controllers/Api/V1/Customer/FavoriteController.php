<?php

namespace App\Http\Controllers\Api\V1\Customer;

use App\Http\Controllers\Controller;
use App\Models\CustomerFavorite;
use App\Models\Part;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Get customer's favorites
     */
    public function index(Request $request)
    {
        $customer = $request->user();

        $favorites = CustomerFavorite::where('customer_id', $customer->id)
            ->with(['part.seller', 'part.images', 'part.standardPart'])
            ->latest()
            ->paginate(15);

        // Transform data
        $favorites->getCollection()->transform(function ($favorite) {
            return [
                'id' => $favorite->id,
                'part' => [
                    'id' => $favorite->part->id,
                    'title' => $favorite->part->standardPart
                        ? ($favorite->part->standardPart->name_ar ?? $favorite->part->standardPart->name_en)
                        : $favorite->part->extra_name,
                    'price' => $favorite->part->price,
                    'currency' => 'YER',
                    'status' => $favorite->part->status,
                    'quality' => $favorite->part->quality,
                    'image_url' => $favorite->part->images->first()
                        ? url('images-proxy/parts/' . basename(str_replace('\\', '/', $favorite->part->images->first()->image_path)))
                        : null,
                    'seller' => [
                        'id' => $favorite->part->seller->id,
                        'store_name' => $favorite->part->seller->store_name,
                        'city' => $favorite->part->seller->city,
                    ]
                ],
                'added_at' => $favorite->created_at->toIso8601String(),
            ];
        });

        return response()->json($favorites);
    }

    /**
     * Add part to favorites
     */
    public function store(Request $request)
    {
        $customer = $request->user();

        $validated = $request->validate([
            'part_id' => 'required|exists:parts,id'
        ]);

        // Check if already in favorites
        $exists = CustomerFavorite::where('customer_id', $customer->id)
            ->where('part_id', $validated['part_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Part already in favorites'
            ], 409);
        }

        $favorite = CustomerFavorite::create([
            'customer_id' => $customer->id,
            'part_id' => $validated['part_id']
        ]);

        return response()->json([
            'message' => 'Part added to favorites',
            'data' => $favorite
        ], 201);
    }

    /**
     * Remove from favorites
     */
    public function destroy(Request $request, $id)
    {
        $customer = $request->user();

        $favorite = CustomerFavorite::where('customer_id', $customer->id)
            ->where('id', $id)
            ->firstOrFail();

        $favorite->delete();

        return response()->json([
            'message' => 'Removed from favorites'
        ]);
    }

    /**
     * Remove by part ID
     */
    public function destroyByPart(Request $request, $partId)
    {
        $customer = $request->user();

        $favorite = CustomerFavorite::where('customer_id', $customer->id)
            ->where('part_id', $partId)
            ->firstOrFail();

        $favorite->delete();

        return response()->json([
            'message' => 'Removed from favorites'
        ]);
    }

    /**
     * Check if part is in favorites
     */
    public function check(Request $request, $partId)
    {
        $customer = $request->user();

        $exists = CustomerFavorite::where('customer_id', $customer->id)
            ->where('part_id', $partId)
            ->exists();

        return response()->json([
            'is_favorite' => $exists
        ]);
    }
}
