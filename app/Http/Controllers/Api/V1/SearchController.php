<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Part;
use App\Http\Resources\PartResource;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Advanced search for parts
     */
    public function search(Request $request)
    {
        $query = Part::with(['seller', 'images', 'standardPart', 'vehicles']);

        // Text search
        if ($request->has('q')) {
            $searchTerm = $request->q;
            $query->where(function ($q) use ($searchTerm) {
                $q->whereHas('standardPart', function ($subQ) use ($searchTerm) {
                    $subQ->where('name_ar', 'like', "%{$searchTerm}%")
                         ->orWhere('name_en', 'like', "%{$searchTerm}%");
                })
                ->orWhere('extra_name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Filter by make
        if ($request->has('make')) {
            $query->whereHas('vehicles', function ($q) use ($request) {
                $q->where('make', $request->make);
            });
        }

        // Filter by model
        if ($request->has('model')) {
            $query->whereHas('vehicles', function ($q) use ($request) {
                $q->where('model', $request->model);
            });
        }

        // Filter by year
        if ($request->has('year')) {
            $year = $request->year;
            $query->whereHas('vehicles', function ($q) use ($year) {
                $q->where('year_from', '<=', $year)
                  ->where('year_to', '>=', $year);
            });
        }

        // Filter by category
        if ($request->has('category_id')) {
            $query->whereHas('standardPart.subcategory', function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        }

        // Filter by subcategory
        if ($request->has('subcategory_id')) {
            $query->whereHas('standardPart', function ($q) use ($request) {
                $q->where('subcategory_id', $request->subcategory_id);
            });
        }

        // Filter by status (condition)
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by quality
        if ($request->has('quality')) {
            $query->where('quality', $request->quality);
        }

        // Price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by city
        if ($request->has('city')) {
            $query->whereHas('seller', function ($q) use ($request) {
                $q->where('city', $request->city);
            });
        }

        // Sort
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        
        $allowedSorts = ['created_at', 'price', 'updated_at'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $parts = $query->paginate($request->input('per_page', 15));

        return PartResource::collection($parts);
    }

    /**
     * Get search suggestions
     */
    public function suggestions(Request $request)
    {
        if (!$request->has('q') || strlen($request->q) < 2) {
            return response()->json(['suggestions' => []]);
        }

        $searchTerm = $request->q;

        // Get part name suggestions
        $partSuggestions = Part::whereHas('standardPart', function ($q) use ($searchTerm) {
            $q->where('name_ar', 'like', "%{$searchTerm}%")
              ->orWhere('name_en', 'like', "%{$searchTerm}%");
        })
        ->with('standardPart')
        ->limit(5)
        ->get()
        ->pluck('standardPart.name_en')
        ->unique()
        ->values();

        // Get vehicle make suggestions
        $makes = \App\Models\Vehicle::where('make', 'like', "%{$searchTerm}%")
            ->distinct()
            ->limit(5)
            ->pluck('make');

        return response()->json([
            'suggestions' => [
                'parts' => $partSuggestions,
                'makes' => $makes,
            ]
        ]);
    }

    /**
     * Get filters options
     */
    public function filters()
    {
        return response()->json([
            'data' => [
                'makes' => \App\Models\Vehicle::distinct()->pluck('make'),
                'status' => ['new', 'used', 'renewed'],
                'quality' => ['original', 'commercial', 'chinese', 'other'],
                'cities' => \App\Models\Seller::distinct()->pluck('city'),
            ]
        ]);
    }
}
