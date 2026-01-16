<?php
// Assume ID 1 exists from seeder
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/parts/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
echo "Details Response: " . $output . "\n";

$data = json_decode($output, true);
if (isset($data['data'])) {
    $item = $data['data'];
    if (isset($item['seller'], $item['price'], $item['title'])) {
         echo "PASS: Fields seller, price, title exist.\n";
    } else {
         echo "FAIL: Missing fields in details.\n";
    }
} else {
    echo "FAIL: No data key in response (Part 1 might not exist).\n";
}
?>
