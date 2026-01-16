<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000/api/v1/parts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
echo "Parts Response: " . $output . "\n";

$data = json_decode($output, true);
if (isset($data['data'])) {
    echo "PASS: Data array exists.\n";
    if (count($data['data']) > 0) {
        $item = $data['data'][0];
        if (isset($item['id'], $item['title'], $item['price'], $item['seller'])) {
             echo "PASS: Fields id, title, price, seller exist.\n";
        } else {
             echo "FAIL: Missing fields in item.\n";
        }
    } else {
        echo "WARN: Data array is empty (Database might be empty).\n";
    }
} else {
    echo "FAIL: No data key in response.\n";
}
?>
