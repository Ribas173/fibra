<?php
header('Content-Type: application/json; charset=UTF-8');
ini_set('display_errors', 1);
error_reporting(E_ALL);

// —– Variáveis de exemplo (pode vir por GET/POST) —–
$amount     = 6400;                // R$64,00 em centavos
$offer_hash = 'er8wkwqumc';
$apiToken = 'sUUcluHNoLW4996zpe3fLehjchHgp1nD5miC67Pr77xCec9P2OOXvnma3WxH';


// Dados do cliente
$customer = [
    'name'         => 'Cliente',
    'email'        => 'cliente@exemplo.com',
    'phone_number' => '11999999999',
    'cpf_cnpj'     => '00000000000',
    'street_name'  => 'Rua Matias Lobato',
    'number'       => '100',
    'complement'   => 'Casa',
    'neighborhood' => 'Centro',
    'city'         => 'São Paulo',
    'state'        => 'SP',
    'zip_code'     => '01001000',
];

// —– Payload completo —–
$payload = [
    $amount = 6400; // em centavos, R$64,00

    $offer_hash = 'er8wkwqumc';

    'payment_method'  => 'pix',
    'customer'        => $customer,
   
   
    'cart'            => [
        [
            'product_hash'   => $offer_hash,
            'title'          => 'Realização de Exame',
            'price'          => $amount,
            'quantity'       => 1,
            'operation_type' => 1,
            'tangible'       => false,
        ],
    ],
    'installments'    => 1,
    'expire_in_days'  => 1,
    'tracking'        => [
        'src'          => null,
        'utm_source'   => null,
        'utm_medium'   => null,
        'utm_campaign' => null,
        'utm_term'     => null,
        'utm_content'  => null,
    ],
];

// —– Chamada cURL —–
$url = "https://api.nitropagamentos.com/api/public/v1/transactions?api_token={sUUcluHNoLW4996zpe3fLehjchHgp1nD5miC67Pr77xCec9P2OOXvnma3WxH}";
$ch  = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST  => 'POST',
    CURLOPT_HTTPHEADER     => [
        'Accept: application/json',
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload),
]);

$resp = curl_exec($ch);
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => curl_error($ch)]);
    exit;
}
curl_close($ch);

// —– Processa e retorna só o Pix —–
$json = json_decode($resp, true);
if (! isset($json['data']['pix'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Resposta inesperada da API']);
    exit;
}

$pix = $json['data']['pix'];
echo json_encode([
    'qr_code_base64' => $pix['qr_code_base64'],
    'qr_code_url'    => $pix['qr_code_url'],
]);
