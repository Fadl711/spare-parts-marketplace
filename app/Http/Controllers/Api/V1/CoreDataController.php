<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class CoreDataController extends Controller
{
    public function getVehicles()
    {
        $vehicles = Vehicle::all();
        // Assuming the requirements want straight output. For production, Resources would be better, but staying simple as per requirements.
        return response()->json([
            'data' => $vehicles
        ]);
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json([
            'data' => $categories
        ]);
    }

    public function getPartTypes(Request $request)
    {
        $query = Subcategory::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $partTypes = $query->get();

        return response()->json([
            'data' => $partTypes
        ]);
    }
}
