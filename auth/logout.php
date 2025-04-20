<?php
session_start();
session_unset();
session_destroy();
$logoutUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=' . urlencode('http://localhost/prontuario-qa/index.php');
header('Location: ' . $logoutUrl);
exit;
