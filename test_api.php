<?php
echo "=== Testing API Endpoints ===\n\n";

// Test 1: Part Detail (ID=1)
echo "1. Testing GET /api/v1/parts/1\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/parts/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response: $output\n\n";

$data = json_decode($output, true);
if (isset($data['data'])) {
    $item = $data['data'];
    if (isset($item['id'], $item['title'], $item['price'], $item['seller'])) {
        echo "✓ PASS: All required fields exist (id, title, price, seller)\n";
    } else {
        echo "✗ FAIL: Missing required fields\n";
        echo "Found fields: " . implode(', ', array_keys($item)) . "\n";
    }
} else {
    echo "✗ FAIL: No 'data' key in response\n";
}

echo "\n---\n\n";

// Test 2: Parts List
echo "2. Testing GET /api/v1/parts\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/parts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";

$data = json_decode($output, true);
if (isset($data['data']) && is_array($data['data']) && count($data['data']) > 0) {
    echo "✓ PASS: Parts list returned with " . count($data['data']) . " items\n";
    echo "First item: " . json_encode($data['data'][0], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n";
} else {
    echo "✗ FAIL: No parts in list\n";
}

echo "\n=== Tests Complete ===\n";
