<?php
$config = require('../config/config.php');
$auth_url = $config['authority'] . "/oauth2/v2.0/authorize?" . http_build_query([
    'client_id' => $config['client_id'],
    'response_type' => 'code',
    'redirect_uri' => $config['redirect_uri'],
    'response_mode' => 'query',
    'scope' => $config['scopes'],
    'state' => '12345' // Pode usar algo dinâmico para segurança
]);

header('Location: ' . $auth_url);
exit;
