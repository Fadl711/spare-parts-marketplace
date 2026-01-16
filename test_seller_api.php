<?php

echo "=== Testing Seller Dashboard API ===\n\n";

// Step 1: Login as Seller
echo "1. Logging in as seller...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/seller/login");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'email' => 'seller@example.com',
    'password' => 'password'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);

$loginData = json_decode($output, true);
if (isset($loginData['token'])) {
    $token = $loginData['token'];
    echo "✓ Login successful! Token: " . substr($token, 0, 20) . "...\n\n";
} else {
    echo "✗ Login failed!\n";
    echo "Response: $output\n";
    exit;
}

// Step 2: Get seller's parts
echo "2. Getting seller's parts...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/seller/parts");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);

$partsData = json_decode($output, true);
if (isset($partsData['data'])) {
    echo "✓ Retrieved " . count($partsData['data']) . " parts\n";
    if (count($partsData['data']) > 0) {
        echo "First part: " . json_encode($partsData['data'][0], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n";
    }
} else {
    echo "Response: $output\n";
}

echo "\n---\n\n";

// Step 3: Create new part
echo "3. Creating new part...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/seller/parts");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'standard_part_id' => 1,
    'price' => 750,
    'status' => 'used',
    'quality' => 'original',
    'extra_name' => 'Test Part from API',
    'description' => 'Created via API test',
    'vehicle_ids' => [1]
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json',
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
$createData = json_decode($output, true);
if ($httpCode == 201 && isset($createData['data'])) {
    echo "✓ Part created successfully!\n";
    echo "New Part ID: " . $createData['data']['id'] . "\n";
    $newPartId = $createData['data']['id'];
} else {
    echo "✗ Failed to create part\n";
    echo "Response: $output\n";
    $newPartId = null;
}

echo "\n---\n\n";

// Step 4: Update part (if created)
if ($newPartId) {
    echo "4. Updating part ID $newPartId...\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/seller/parts/$newPartId");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'price' => 850,
        'status' => 'new'
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    curl_close($ch);

    $updateData = json_decode($output, true);
    if (isset($updateData['message'])) {
        echo "✓ " . $updateData['message'] . "\n";
    } else {
        echo "Response: $output\n";
    }

    echo "\n---\n\n";

    // Step 5: Delete part
    echo "5. Deleting part ID $newPartId...\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/seller/parts/$newPartId");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $token,
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    curl_close($ch);

    $deleteData = json_decode($output, true);
    if (isset($deleteData['message'])) {
        echo "✓ " . $deleteData['message'] . "\n";
    } else {
        echo "Response: $output\n";
    }
}

echo "\n=== Seller Dashboard Tests Complete ===\n";
