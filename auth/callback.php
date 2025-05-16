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

        $headers = [
            "Authorization: Bearer {$data['access_token']}",
            "Content-Type: application/json"
        ];

        $chead = curl_init('https://graph.microsoft.com/v1.0/me');
        curl_setopt($chead, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($chead, CURLOPT_RETURNTRANSFER, true);
        $userResponse = curl_exec($chead);
        curl_close($chead);

        $userData = json_decode($userResponse, true);
        $email = $userData['mail'] ?? $userData['userPrincipalName'];
        $user = $userData['displayName'] ?? $userData['userPrincipalName'];

        $allowedEmails = ['gustavo.goncalves@doutoresdaweb.com.br', 'carlos.severiano@doutoresdaweb.com.br', 'gustavo.wustemberg@doutoresdaweb.com.br', 'hiago.silva@doutoresdaweb.com.br', 'thaynara.silva@doutoresdaweb.com.br', 'gustavo.chagas@doutoresdaweb.com.br'];

        $host = $_SERVER['HTTP_HOST'];
        if ($host == 'localhost' && strpos($host, 'homologacao') === false) {
            if (!in_array($email, $allowedEmails)) {
                echo "<p>Acesso não autorizado.</p>";
                echo "<a href='logout.php'>Tentar com outra conta</a><br>";
                die('Acesso não autorizado!');
            }
        }

        $_SESSION['access_token'] = $data['access_token'];
        $_SESSION['email'] = $email;
        $_SESSION['user'] = $user;
        header('Location: /prontuario-qa/index.php');
        exit;
    }
}
