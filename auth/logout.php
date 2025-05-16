<?php
session_start();
session_unset();
session_destroy();
$logout_url = 'https://login.microsoftonline.com/common/oauth2/v2.0/logout';
$redirect = urlencode('https://deploy.mpitemporario.com.br/prontuario-qa/index.php');
header("Location: {$logout_url}?post_logout_redirect_uri={$redirect}");
exit;
