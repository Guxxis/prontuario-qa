<?php

// Função para carregar o arquivo .env
function loadEnv($path = '../.env') {
    if (!file_exists($path)) {
        die("Arquivo .env não encontrado!");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        if (strpos($line, '#') === 0) {
            continue; // Ignorar comentários
        }
        list($key, $value) = explode('=', $line, 2);
        putenv(trim($key) . '=' . trim($value));
    }
}

// Carregar as variáveis de ambiente
loadEnv();

// Agora você pode acessar as variáveis de ambiente
$azureClientId = getenv('AZURE_CLIENT_ID');
$azureClientSecret = getenv('AZURE_CLIENT_SECRET');
$azureTenantId = getenv('AZURE_TENANT_ID');
$azureRedirectUri = getenv('AZURE_REDIRECT_URI');

return [
    'client_id' => $azureClientId,
    'client_secret' => $azureClientSecret,
    'redirect_uri' => 'http://localhost/prontuario-qa/auth/callback.php',
    'authority' => 'https://login.microsoftonline.com/' + $azureTenantId,
    'scopes' => 'openid profile email'
];
