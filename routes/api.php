<?php

use App\Http\Controllers\Api\V1\Auth\CustomerAuthController;
use App\Http\Controllers\Api\V1\Auth\SellerAuthController;
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

    Route::controller(\App\Http\Controllers\Api\V1\CoreDataController::class)->group(function () {
        Route::get('vehicles', 'getVehicles');
        Route::get('categories', 'getCategories');
        Route::get('part-types', 'getPartTypes');
    });

    Route::controller(\App\Http\Controllers\Api\V1\MarketplaceController::class)->group(function () {
        Route::get('parts', 'index');
        Route::get('parts/{id}', 'show');
    });

    // Search
    Route::controller(\App\Http\Controllers\Api\V1\SearchController::class)->group(function () {
        Route::get('search', 'search');
        Route::get('search/suggestions', 'suggestions');
        Route::get('search/filters', 'filters');
    });

    // Reviews (public read, auth write)
    Route::controller(\App\Http\Controllers\Api\V1\ReviewController::class)->group(function () {
        Route::get('sellers/{sellerId}/reviews', 'index');
        
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('reviews', 'store');
            Route::put('reviews/{id}', 'update');
            Route::delete('reviews/{id}', 'destroy');
        });
    });

    // Messaging (auth required)
    Route::middleware('auth:sanctum')->controller(\App\Http\Controllers\Api\V1\MessagingController::class)->group(function () {
        Route::get('conversations', 'conversations');
        Route::get('conversations/{conversationId}/messages', 'messages');
        Route::post('messages', 'send');
    });

    // Seller Dashboard - Part Management
    Route::middleware('auth:sanctum')->prefix('seller')->group(function () {
        Route::controller(\App\Http\Controllers\Api\V1\Seller\PartController::class)->group(function () {
            Route::get('parts', 'index');
            Route::post('parts', 'store');
            Route::get('parts/{id}', 'show');
            Route::put('parts/{id}', 'update');
            Route::delete('parts/{id}', 'destroy');
            
            // Image management
            Route::post('parts/{id}/images', 'uploadImages');
            Route::delete('parts/{partId}/images/{imageId}', 'deleteImage');
        });
    });

    // Customer Dashboard - Favorites & Orders
    Route::middleware('auth:sanctum')->prefix('customer')->group(function () {
        
        // Favorites
        Route::controller(\App\Http\Controllers\Api\V1\Customer\FavoriteController::class)->group(function () {
            Route::get('favorites', 'index');
            Route::post('favorites', 'store');
            Route::delete('favorites/{id}', 'destroy');
            Route::delete('favorites/part/{partId}', 'destroyByPart');
            Route::get('favorites/check/{partId}', 'check');
        });

        // Orders
        Route::controller(\App\Http\Controllers\Api\V1\Customer\OrderController::class)->group(function () {
            Route::get('orders', 'index');
            Route::post('orders', 'store');
            Route::get('orders/{id}', 'show');
            Route::post('orders/{id}/cancel', 'cancel');
        });
    });

    // Admin Panel
    Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
        
        // Dashboard
        Route::controller(\App\Http\Controllers\Api\V1\Admin\DashboardController::class)->group(function () {
            Route::get('dashboard', 'index');
            Route::get('dashboard/recent', 'recentActivities');
        });

        // Seller Management
        Route::controller(\App\Http\Controllers\Api\V1\Admin\SellerManagementController::class)->group(function () {
            Route::get('sellers', 'index');
            Route::get('sellers/{id}', 'show');
            Route::post('sellers/{id}/approve', 'approve');
            Route::post('sellers/{id}/reject', 'reject');
            Route::post('sellers/{id}/activate', 'activate');
            Route::post('sellers/{id}/deactivate', 'deactivate');
            Route::delete('sellers/{id}', 'destroy');
        });
    });
});
