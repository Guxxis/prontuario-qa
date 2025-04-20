<?php
session_start();
$config = require('../config/config.php');

if (isset($_GET['code'])) {
    $token_url = $config['authority'] . '/oauth2/v2.0/token';
    $post_fields = [
        'client_id' => $config['client_id'],
        'scope' => $config['scopes'],
        'code' => $_GET['code'],
        'redirect_uri' => $config['redirect_uri'],
        'grant_type' => 'authorization_code',
        'client_secret' => $config['client_secret']
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $token_url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($post_fields)
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($response, true);

    if (isset($data['access_token'])) {
        $_SESSION['access_token'] = $data['access_token'];
        header('Location: /prontuario-qa/index.php');
        exit;
    }
}
