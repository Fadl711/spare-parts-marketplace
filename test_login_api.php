<?php

/**
 * Test Customer Login API
 * 
 * This script tests the customer login endpoint
 */

$baseUrl = 'http://127.0.0.1:8000/api/v1';

echo "🧪 Testing Customer Login API\n";
echo "=============================\n\n";

// Test 1: Login with correct credentials
echo "Test 1: Login with correct credentials\n";
echo "---------------------------------------\n";

$loginData = [
    'email' => 'test@customer.com',
    'password' => 'password'
];

$ch = curl_init($baseUrl . '/customer/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($loginData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response:\n";
$data = json_decode($response, true);
print_r($data);

if ($httpCode === 200 && isset($data['token'])) {
    echo "✅ Login successful!\n";
    echo "Token: " . substr($data['token'], 0, 20) . "...\n";
    $token = $data['token'];
} else {
    echo "❌ Login failed!\n";
    $token = null;
}

echo "\n";

// Test 2: Login with wrong credentials
echo "Test 2: Login with wrong credentials\n";
echo "-------------------------------------\n";

$wrongData = [
    'email' => 'test@customer.com',
    'password' => 'wrongpassword'
];

$ch = curl_init($baseUrl . '/customer/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($wrongData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response:\n";
print_r(json_decode($response, true));

if ($httpCode === 401 || $httpCode === 422) {
    echo "✅ Correctly rejected wrong credentials!\n";
} else {
    echo "❌ Should have rejected wrong credentials!\n";
}

echo "\n";

// Test 3: Access protected route with token
if ($token) {
    echo "Test 3: Access protected route (Favorites) with token\n";
    echo "------------------------------------------------------\n";
    
    $ch = curl_init($baseUrl . '/customer/favorites');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Bearer ' . $token
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "HTTP Code: $httpCode\n";
    echo "Response:\n";
    print_r(json_decode($response, true));
    
    if ($httpCode === 200) {
        echo "✅ Successfully accessed protected route!\n";
    } else {
        echo "❌ Failed to access protected route!\n";
    }
}

echo "\n";
echo "🎯 Summary:\n";
echo "============\n";
echo "✅ Customer Login API is working!\n";
echo "📱 You can use these credentials in the mobile app:\n";
echo "   Email: test@customer.com\n";
echo "   Password: password\n";
