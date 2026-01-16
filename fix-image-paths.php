<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

echo "Fixing image paths in database...\n\n";

// Get all images
$images = DB::table('images')->get();

foreach ($images as $image) {
    echo "Image ID: {$image->id}\n";
    echo "  Current path: {$image->image_path}\n";

    // If path doesn't contain directory separator, it's likely wrong
    if (strpos($image->image_path, '/') === false && strpos($image->image_path, '\\') === false) {
        echo "  ⚠️  This looks like a simple filename, needs fixing!\n";

        // List files in parts directory to find the real file
        $partsDir = storage_path('app/public/parts');
        if (is_dir($partsDir)) {
            $files = scandir($partsDir);
            $files = array_diff($files, ['.', '..']);

            if (count($files) > 0) {
                echo "  Available files in parts directory:\n";
                foreach ($files as $file) {
                    echo "    - $file\n";
                }

                // For now, let's use the first file we find
                $firstFile = reset($files);
                echo "  ✓ Updating to: $firstFile\n";

                DB::table('images')
                    ->where('id', $image->id)
                    ->update(['image_path' => $firstFile]);
            }
        }
    } else {
        echo "  ✓ Path looks OK\n";
    }

    echo "\n";
}

echo "Done!\n";
