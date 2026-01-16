<?php

$url = 'http://127.0.0.1:8000/api/v1/customer/register';
$data = [
    'name' => 'Test User ' . rand(1000, 9999),
    'phone' => '0777' . rand(100000, 999999), // Random phone
    'email' => 'test' . rand(1000, 9999) . '@example.com', // Random email
    'password' => '12345678',
    'password_confirmation' => '12345678',
    'device_name' => 'test-script'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $response . "\n";
