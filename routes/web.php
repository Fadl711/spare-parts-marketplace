<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// مسار خاص لخدمة الصور لتجاوز مشاكل الروابط في ويندوز
Route::get('/images-proxy/{path}', function ($path) {
    // $path قد يحتوي على مجلدات (مثال: parts/01KF3QBMSS68625X7CMX3YCW3R.webp)
    $fullPath = storage_path('app/public/' . $path);
    if (!File::exists($fullPath)) {
        abort(404);
    }
    $mime = File::mimeType($fullPath);
    $content = File::get($fullPath);
    return Response::make($content, 200)->header('Content-Type', $mime);
})->where('path', '.*');  // للسماح بالنقاط في اسم الملف
