<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:customers',
            'email' => 'required|string|email|max:255|unique:customers',
            'password' => 'required|string|min:8|confirmed',
            'device_name' => 'required|string',
        ]);

        $customer = Customer::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'city' => 'Unspecified', // Defaulting as per API contract since DB requires it but Request doesn't
        ]);

        $token = $customer->createToken($request->device_name, ['customer'])->plainTextToken;

        return response()->json([
            'message' => 'Account created successfully',
            'user' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'type' => 'customer',
            ],
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required_without:phone|string',
            'phone' => 'required_without:email|string',
            'password' => 'required',
            'device_name' => 'nullable|string',
        ]);

        // Find customer by email or phone
        $customer = null;
        if ($request->email) {
            $customer = Customer::where('email', $request->email)->first();
        } elseif ($request->phone) {
            $customer = Customer::where('phone', $request->phone)->first();
        }

        if (! $customer || ! Hash::check($request->password, $customer->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $deviceName = $request->device_name ?? 'mobile-app';
        $token = $customer->createToken($deviceName, ['customer'])->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'type' => 'customer',
            ],
            'token' => $token,
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
