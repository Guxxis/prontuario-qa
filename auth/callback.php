<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    // echo "Callback chegou até aqui!";
    // $data = json_decode($response, true);
    // var_dump($data);
    // exit;

    if (isset($data['access_token'])) {
        $_SESSION['access_token'] = $data['access_token'];
        // Aqui você pode decodificar o token ou fazer requisição ao /me da Microsoft
        // $basePath = dirname($_SERVER['PHP_SELF'], 2); // volta duas pastas a partir de /auth/callback.php
        // header("Location: {$basePath}/index.php");
        header('Location: /prontuario-qa/index.php');
        exit;
    }
}
