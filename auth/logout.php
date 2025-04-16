<?php
session_start();
session_destroy();
header('Location: https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhot/');
exit;
