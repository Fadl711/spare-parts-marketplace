<?php

use App\Http\Controllers\Api\V1\Auth\CustomerAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {

    // مسارات مصادقة العملاء (Customer Auth)
    Route::controller(CustomerAuthController::class)->group(function () {
        Route::post('customer/register', 'register');
        Route::post('customer/login', 'login');

        // المسارات المحمية بواسطة التوكن
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('customer/logout', 'logout');
        });
    });

    // مسارات مصادقة البائعين (Seller Auth)
    Route::controller(SellerAuthController::class)->group(function () {
        Route::post('seller/register', 'register');
        Route::post('seller/login', 'login');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('seller/logout', 'logout');
        });
    });

    // هنا سنضع مسارات البحث عن قطع الغيار والمراجعات لاحقاً
});
