<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Get first part with images
$part = \App\Models\Part::with('images')->first();

if ($part) {
    echo "Part ID: " . $part->id . "\n";
    echo "Part Title: " . ($part->standardPart ? $part->standardPart->name_ar : $part->extra_name) . "\n\n";

    if ($part->images->count() > 0) {
        echo "Number of images: " . $part->images->count() . "\n\n";

        foreach ($part->images as $index => $image) {
            echo "Image #" . ($index + 1) . ":\n";
            echo "  Raw path: " . $image->image_path . "\n";

            // Test the fix
            $normalizedPath = str_replace('\\', '/', $image->image_path);
            $filename = basename($normalizedPath);
            $url = url('images-proxy/parts/' . $filename);

            echo "  Normalized: " . $normalizedPath . "\n";
            echo "  Filename: " . $filename . "\n";
            echo "  URL: " . $url . "\n";

            // Check if file exists
            $fullPath = storage_path('app/public/parts/' . $filename);
            echo "  Full path: " . $fullPath . "\n";
            echo "  File exists: " . (file_exists($fullPath) ? 'YES' : 'NO') . "\n\n";
        }
    } else {
        echo "No images found for this part\n";
    }
} else {
    echo "No parts found in database\n";
}
