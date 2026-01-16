<?php

namespace App\Http\Controllers\Api\V1\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Get customer's orders
     */
    public function index(Request $request)
    {
        $customer = $request->user();

        $orders = Order::where('customer_id', $customer->id)
            ->with(['part.seller', 'part.standardPart', 'part.images'])
            ->latest()
            ->paginate(15);

        // Transform data
        $orders->getCollection()->transform(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                'status' => $order->status,
                'total_price' => $order->total_price,
                'part' => [
                    'id' => $order->part->id,
                    'title' => $order->part->standardPart
                        ? ($order->part->standardPart->name_ar ?? $order->part->standardPart->name_en)
                        : $order->part->extra_name,
                    'price' => $order->part->price,
                    'image_url' => $order->part->images->first()
                        ? url('images-proxy/parts/' . basename(str_replace('\\', '/', $order->part->images->first()->image_path)))
                        : null,
                ],
                'seller' => [
                    'id' => $order->part->seller->id,
                    'store_name' => $order->part->seller->store_name,
                    'phone' => $order->part->seller->phone,
                    'city' => $order->part->seller->city,
                ],
                'delivery_address' => $order->delivery_address,
                'delivery_city' => $order->delivery_city,
                'delivery_district' => $order->delivery_district,
                'customer_phone' => $order->customer_phone,
                'notes' => $order->notes,
                'created_at' => $order->created_at->toIso8601String(),
                'updated_at' => $order->updated_at->toIso8601String(),
            ];
        });

        return response()->json($orders);
    }

    /**
     * Create new order
     */
    public function store(Request $request)
    {
        $customer = $request->user();

        $validated = $request->validate([
            'part_id' => 'required|exists:parts,id',
            'delivery_city' => 'required|string|max:100',
            'delivery_district' => 'required|string|max:100',
            'delivery_address' => 'required|string',
            'customer_phone' => 'required|string|max:20',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $part = Part::findOrFail($validated['part_id']);

            $order = Order::create([
                'customer_id' => $customer->id,
                'part_id' => $part->id,
                'seller_id' => $part->seller_id,
                'total_price' => $part->price,
                'status' => 'pending',
                'delivery_city' => $validated['delivery_city'],
                'delivery_district' => $validated['delivery_district'],
                'delivery_address' => $validated['delivery_address'],
                'customer_phone' => $validated['customer_phone'],
                'notes' => $validated['notes'] ?? null,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'data' => [
                    'id' => $order->id,
                    'order_number' => 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                    'status' => $order->status,
                    'total_price' => $order->total_price,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to create order',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get order details
     */
    public function show(Request $request, $id)
    {
        $customer = $request->user();

        $order = Order::where('customer_id', $customer->id)
            ->with(['part.seller', 'part.standardPart', 'part.images'])
            ->findOrFail($id);

        return response()->json([
            'data' => [
                'id' => $order->id,
                'order_number' => 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                'status' => $order->status,
                'total_price' => $order->total_price,
                'part' => [
                    'id' => $order->part->id,
                    'title' => $order->part->standardPart
                        ? ($order->part->standardPart->name_ar ?? $order->part->standardPart->name_en)
                        : $order->part->extra_name,
                    'price' => $order->part->price,
                    'status' => $order->part->status,
                    'quality' => $order->part->quality,
                    'images' => $order->part->images->pluck('image_path'),
                ],
                'seller' => [
                    'id' => $order->part->seller->id,
                    'store_name' => $order->part->seller->store_name,
                    'phone' => $order->part->seller->phone,
                    'city' => $order->part->seller->city,
                    'district' => $order->part->seller->district,
                    'address' => $order->part->seller->address,
                ],
                'delivery' => [
                    'city' => $order->delivery_city,
                    'district' => $order->delivery_district,
                    'address' => $order->delivery_address,
                    'phone' => $order->customer_phone,
                ],
                'notes' => $order->notes,
                'created_at' => $order->created_at->toIso8601String(),
                'updated_at' => $order->updated_at->toIso8601String(),
            ]
        ]);
    }

    /**
     * Cancel order (only if pending)
     */
    public function cancel(Request $request, $id)
    {
        $customer = $request->user();

        $order = Order::where('customer_id', $customer->id)
            ->where('status', 'pending')
            ->findOrFail($id);

        $order->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Order cancelled successfully'
        ]);
    }
}
