<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SellerAuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'store_name' => 'required|string|unique:sellers',
            'owner_name' => 'required|string',
            'email' => 'nullable|email|unique:sellers',
            'phone' => 'required|unique:sellers',
            'password' => 'required|min:8|confirmed',
            'city' => 'required|string',
            'district' => 'required|string',
            'device_name' => 'required|string',
        ]);

        $seller = Seller::create([
            'store_name' => $request->store_name,
            'owner_name' => $request->owner_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'city' => $request->city,
            'district' => $request->district,
            'address' => '', // Default empty or can be added to request
            'password' => Hash::make($request->password),
        ]);

        $token = $seller->createToken($request->device_name, ['seller'])->plainTextToken;

        return response()->json([
            'message' => 'Store registered successfully',
            'data' => [
                'user' => [
                    'id' => $seller->id,
                    'store_name' => $seller->store_name,
                    'owner_name' => $seller->owner_name,
                    'location' => [
                        'city' => $seller->city,
                        'district' => $seller->district,
                    ],
                    'type' => 'seller',
                ],
                'token' => $token,
            ],
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $seller = Seller::where('phone', $request->phone)->first();

        if (! $seller || ! Hash::check($request->password, $seller->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = $seller->createToken($request->device_name, ['seller'])->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'user' => [
                    'id' => $seller->id,
                    'store_name' => $seller->store_name,
                    'owner_name' => $seller->owner_name,
                    'type' => 'seller',
                ],
                'token' => $token,
            ],
        ]);
    }
    
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
