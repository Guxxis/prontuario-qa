<?php
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$scriptDir = rtrim(str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']), '/');

define('SYSROOT', $scriptDir);
define('RAIZ', $scheme . '://' . $host . $scriptDir);
define('BASE', RAIZ . '/doutor'); 
define('HTACCESS', str_replace('www.', '', $host) . $scriptDir);

//Gera o .htaccess
$RAIZHTACCESS = RAIZ . "/";
$HTACCESS = HTACCESS;
$htaccess = <<<HTACCESS

#Definindo o idioma padrão

  DefaultLanguage pt-BR

#Ocultando informações do servidor

  ServerSignature Off

#Redirecionando para HTTPS

  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^.*$ https://%{SERVER_NAME}%{REQUEST_URI} [R,L]
 
  Options All -Indexes

#Forçando a codificação UTF-8

  AddDefaultCharset utf-8
  AddCharset utf-8 .html .css .js .xml .json .rss

<IfModule mod_rewrite.c>
  #Reescrita de URL

    RewriteCond %{SCRIPT_FILENAME} !-f
    RewriteCond %{SCRIPT_FILENAME} !-d
    RewriteRule ^(.*)$ index.php?url=$1

</IfModule>

#Exibindo uma página 404 personalizada

  errordocument 404 {$RAIZHTACCESS}404

#Exibindo erro 403 como 404

  errordocument 403 {$RAIZHTACCESS}404

#Impedindo a exibição de diretórios

  Options -MultiViews

#Impede de navegar em pastas sem um documento padrão (index) e exibe Erro 403 - permissão negada

  <IfModule mod_autoindex.c>
    Options -Indexes
  </IfModule>

#Forçando a última versão do IE

  <IfModule mod_setenvif.c>
    <IfModule mod_headers.c>
      BrowserMatch MSIE ie
      Header set X-UA-Compatible "IE=Edge,chrome=1" env=ie
    </IfModule>
  </IfModule>

#Informando proxies sobre alterações de conteúdo

  <IfModule mod_headers.c>
    Header append Vary User-Agent
  </IfModule>

#Configurando as Politicas de Segurança

  <IfModule mod_headers.c>

    # Política de Referência
    Header set Referrer-Policy "strict-origin-when-cross-origin"

    # Política de Permissões (novas APIs do navegador)
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=(), fullscreen=(self), autoplay=(self)"

    # Segurança de Transporte
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

    # Impede detecção incorreta de MIME
    Header set X-Content-Type-Options "nosniff"

    # Proteção contra clickjacking
    Header set X-Frame-Options "SAMEORIGIN"

    # Proteção contra XSS 
    Header set X-XSS-Protection "1; mode=block"

    # Política de Segurança de Conteúdo (CSP)
    Header set Content-Security-Policy "frame-ancestors 'self';"
  
  </IfModule>

#Configurando Controle de cache

  <IfModule mod_headers.c>
    <FilesMatch "\.(js|css|jpg|jpeg|png|gif|webp|svg|woff2?)$">
      Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
  </IfModule>

#Negando acessos a arquivos

  <FilesMatch "(\.env|\.htaccess|composer\.(json|lock)|php\.ini|\.git)">
    Require all denied
  </FilesMatch>

  # Bloquear acesso direto à pasta config, auth, inc, vendor
  RedirectMatch 403 ^/(config|auth|inc|vendor)/

#Redirecionamento do Favicon
  <Files "favicon.ico">
      Redirect 302 /favicon.ico /image/favicon.ico
  </Files>
#Fazendo cache de recursos

  <IfModule mod_expires.c>
    Header set Cache-Control "public"
    ExpiresActive on
    ExpiresDefault "access plus 1 month"
    ExpiresByType text/cache-manifest "access plus 0 seconds"
    ExpiresByType text/html "access plus 0 seconds"

    #Dados

      ExpiresByType text/xml "access plus 0 seconds"
      ExpiresByType application/xml "access plus 0 seconds"
      ExpiresByType application/json "access plus 0 seconds"

    #Feed RSS

      ExpiresByType application/rss+xml "access plus 1 hour"

    #Favicon (não pode ser renomeado)

      ExpiresByType image/vnd.microsoft.icon "access plus 1 week"

    #Imagens, vídeo, audio;

      ExpiresByType image/gif "access plus 1 month"
      ExpiresByType image/png "access plus 1 month"
      ExpiresByType image/jpg "access plus 1 month"
      ExpiresByType image/jpeg "access plus 1 month"
      ExpiresByType video/ogg "access plus 1 month"
      ExpiresByType audio/ogg "access plus 1 month"
      ExpiresByType video/mp4 "access plus 1 month"
      ExpiresByType video/webm "access plus 1 month"

    #Webfonts

      ExpiresByType font/truetype "access plus 1 month"
      ExpiresByType font/opentype "access plus 1 month"
      ExpiresByType font/woff "access plus 1 month"
      ExpiresByType image/svg+xml "access plus 1 month"
      ExpiresByType application/vnd.ms-fontobject "access plus 1 month"

    #CSS / jScript

      ExpiresByType text/css "access plus 1 month"
      ExpiresByType application/javascript "access plus 1 month"
      ExpiresByType text/javascript "access plus 1 month"
  </IfModule>
HTACCESS;
file_put_contents('.htaccess', $htaccess);