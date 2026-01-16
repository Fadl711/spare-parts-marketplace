<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Part;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    public function index(Request $request)
    {
        $query = Part::with(['seller', 'images', 'standardPart']);

        // Filter by Make/Model (via Vehicles relation)
        if ($request->has('make') || $request->has('model')) {
            $query->whereHas('vehicles', function ($q) use ($request) {
                if ($request->has('make')) {
                    $q->where('make', $request->make);
                }
                if ($request->has('model')) {
                    $q->where('model', $request->model);
                }
            });
        }

        // Filter by Part Name
        if ($request->has('part_name')) {
            $partName = $request->part_name;
            $query->where(function ($q) use ($partName) {
                $q->whereHas('standardPart', function ($subQ) use ($partName) {
                    $subQ->where('name_ar', 'like', "%{$partName}%")
                         ->orWhere('name_en', 'like', "%{$partName}%");
                })->orWhere('extra_name', 'like', "%{$partName}%");
            });
        }

        // Filter by Condition
        if ($request->has('condition')) {
            $query->where('status', $request->condition);
        }

        $parts = $query->paginate(15);

        // Transform collection to match requirements
        $parts->getCollection()->transform(function ($part) {
            return [
                'id' => $part->id,
                'title' => $part->standardPart ? ($part->standardPart->name_ar ?? $part->standardPart->name_en) : $part->extra_name, // Fallback
                'price' => $part->price,
                'currency' => 'YER', // Hardcoded as per example, or could be in DB
                'condition' => $part->status,
                'quality' => $part->quality,
                'image_urls' => $part->images->pluck('image_path'),
                'seller' => [
                    'id' => $part->seller->id,
                    'store_name' => $part->seller->store_name,
                    'rating' => 0.0, // Placeholder, implementation of reviews needed for real rating
                    'location' => [
                        'city' => $part->seller->city,
                        'district' => $part->seller->district,
                    ],
                    'phones' => [$part->seller->phone],
                    'whatsapp' => $part->seller->whatsapp_link,
                ],
            ];
        });

        return response()->json($parts);
    }

    public function show($id)
    {
        $part = Part::with(['seller', 'images', 'standardPart', 'vehicles'])->find($id);

        if (!$part) {
            return response()->json([
                'error' => 'Part not found'
            ], 404);
        }

        return response()->json([
            'data' => [
                'id' => $part->id,
                'title' => $part->standardPart ? ($part->standardPart->name_ar ?? $part->standardPart->name_en) : $part->extra_name,
                'price' => $part->price,
                'seller' => [
                    'id' => $part->seller->id,
                    'store_name' => $part->seller->store_name,
                    'rating' => 0.0,
                    'location' => [
                        'city' => $part->seller->city,
                        'district' => $part->seller->district,
                    ],
                    'phones' => [$part->seller->phone],
                    'whatsapp' => $part->seller->whatsapp_link,
                ],
            ]
        ]);
    }
}
