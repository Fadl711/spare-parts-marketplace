<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\Customer;
use App\Models\Part;
use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function index()
    {
        $stats = [
            'sellers' => [
                'total' => Seller::count(),
                'active' => Seller::where('is_approved', true)->count(),
                'pending' => Seller::where('is_approved', false)->count(),
            ],
            'customers' => [
                'total' => Customer::count(),
                'active' => Customer::where('is_active', true)->count(),
            ],
            'parts' => [
                'total' => Part::count(),
                'new' => Part::where('status', 'new')->count(),
                'used' => Part::where('status', 'used')->count(),
                'renewed' => Part::where('status', 'renewed')->count(),
            ],
            'orders' => [
                'total' => Order::count(),
                'pending' => Order::where('status', 'pending')->count(),
                'processing' => Order::where('status', 'processing')->count(),
                'delivered' => Order::where('status', 'delivered')->count(),
                'cancelled' => Order::where('status', 'cancelled')->count(),
            ],
        ];

        return response()->json(['data' => $stats]);
    }

    /**
     * Get recent activities
     */
    public function recentActivities()
    {
        $recentOrders = Order::with(['customer', 'seller', 'part'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($order) {
                return [
                    'type' => 'order',
                    'id' => $order->id,
                    'customer' => $order->customer->name,
                    'seller' => $order->seller->store_name,
                    'status' => $order->status,
                    'price' => $order->total_price,
                    'created_at' => $order->created_at->toIso8601String(),
                ];
            });

        $recentParts = Part::with(['seller', 'standardPart'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($part) {
                return [
                    'type' => 'part',
                    'id' => $part->id,
                    'seller' => $part->seller->store_name,
                    'title' => $part->standardPart ? $part->standardPart->name_en : $part->extra_name,
                    'price' => $part->price,
                    'status' => $part->status,
                    'created_at' => $part->created_at->toIso8601String(),
                ];
            });

        return response()->json([
            'data' => [
                'orders' => $recentOrders,
                'parts' => $recentParts,
            ]
        ]);
    }
}
