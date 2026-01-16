<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use Illuminate\Http\Request;

class SellerManagementController extends Controller
{
    /**
     * Get all sellers
     */
    public function index(Request $request)
    {
        $query = Seller::query();

        // Filter by approval status
        if ($request->has('approved')) {
            $query->where('is_approved', $request->boolean('approved'));
        }

        // Filter by active status
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('store_name', 'like', "%{$search}%")
                  ->orWhere('owner_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $sellers = $query->withCount('parts')->paginate(20);

        return response()->json($sellers);
    }

    /**
     * Get seller details
     */
    public function show($id)
    {
        $seller = Seller::withCount(['parts', 'orders'])
            ->findOrFail($id);

        return response()->json(['data' => $seller]);
    }

    /**
     * Approve seller
     */
    public function approve($id)
    {
        $seller = Seller::findOrFail($id);
        $seller->update(['is_approved' => true]);

        return response()->json([
            'message' => 'Seller approved successfully',
            'data' => $seller
        ]);
    }

    /**
     * Reject/Disapprove seller
     */
    public function reject($id)
    {
        $seller = Seller::findOrFail($id);
        $seller->update(['is_approved' => false]);

        return response()->json([
            'message' => 'Seller rejected',
            'data' => $seller
        ]);
    }

    /**
     * Activate seller
     */
    public function activate($id)
    {
        $seller = Seller::findOrFail($id);
        $seller->update(['is_active' => true]);

        return response()->json([
            'message' => 'Seller activated',
            'data' => $seller
        ]);
    }

    /**
     * Deactivate seller
     */
    public function deactivate($id)
    {
        $seller = Seller::findOrFail($id);
        $seller->update(['is_active' => false]);

        return response()->json([
            'message' => 'Seller deactivated',
            'data' => $seller
        ]);
    }

    /**
     * Delete seller
     */
    public function destroy($id)
    {
        $seller = Seller::findOrFail($id);
        $seller->delete();

        return response()->json([
            'message' => 'Seller deleted successfully'
        ]);
    }
}
