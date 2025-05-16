<?php
function loadEnv($path = '../.env')
{
    if (!file_exists($path)) {
        die("Arquivo .env não encontrado!");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        if (strpos($line, '#') === 0) {
            continue;
        }
        list($key, $value) = explode('=', $line, 2);
        putenv(trim($key) . '=' . trim($value));
    }
}

loadEnv();

$azureClientId = getenv('AZURE_CLIENT_ID');
$azureClientSecret = getenv('AZURE_CLIENT_SECRET');
$azureTenantId = getenv('AZURE_TENANT_ID');
$azureRedirectUri = getenv('AZURE_REDIRECT_URI');

return [
    'client_id' => $azureClientId,
    'client_secret' => $azureClientSecret,
    'redirect_uri' => $azureRedirectUri . '/auth/callback.php',
    'authority' => 'https://login.microsoftonline.com/' . $azureTenantId,
    'scopes' => 'openid profile email user.read'
];
