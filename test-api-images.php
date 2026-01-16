<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Get first part with images
$part = \App\Models\Part::with('images')->first();

if ($part && $part->images->count() > 0) {
    foreach ($part->images as $image) {
        $normalizedPath = str_replace('\\', '/', $image->image_path);
        $filename = basename($normalizedPath);
        $url = url('images-proxy/parts/' . $filename);

        echo "Image URL: " . $url . "\n";

        // Test the actual route
        $fullPath = storage_path('app/public/parts/' . $filename);
        if (file_exists($fullPath)) {
            echo "✓ File exists at: " . $fullPath . "\n";
            echo "✓ File size: " . filesize($fullPath) . " bytes\n";
        } else {
            echo "✗ File NOT found at: " . $fullPath . "\n";
        }
        echo "\n";
    }
}

// Test API endpoint
echo "\n=== Testing API Endpoint ===\n";
$response = file_get_contents('http://192.168.8.124:8080/api/v1/marketplace/parts');
$data = json_decode($response, true);

if ($data && isset($data['data']) && count($data['data']) > 0) {
    $firstPart = $data['data'][0];
    echo "First Part from API:\n";
    echo "  Title: " . ($firstPart['title'] ?? 'N/A') . "\n";
    if (isset($firstPart['image_urls']) && count($firstPart['image_urls']) > 0) {
        echo "  Image URLs:\n";
        foreach ($firstPart['image_urls'] as $url) {
            echo "    - " . $url . "\n";
        }
    } else {
        echo "  No image URLs found\n";
    }
}
