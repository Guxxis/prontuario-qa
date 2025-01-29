<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// URL do Webhook no n8n
$webhook_url = "https://seu-n8n.com/webhook/receber-formulario";

// Capturar os dados do formulário
$nome = $_POST['nome'] ?? 'Não informado';
$email = $_POST['email'] ?? 'Não informado';
$dominio = $_POST['dominio'] ?? 'Não informado';

// Criar array de dados
$data = [
    "nome" => $nome,
    "email" => $email,
    "dominio" => $dominio,
    "pontuacao" => 50
];

// Configuração do cURL
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

// Executa o envio e captura a resposta
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Exibir informações úteis para debugging
echo "<pre>";
echo "Resposta do n8n: " . htmlspecialchars($response) . "\n";
echo "Código HTTP: " . $httpCode . "\n";
echo "Erro cURL: " . $error . "\n";
echo "JSON Enviado: " . json_encode($data, JSON_PRETTY_PRINT);
echo "</pre>";
?>
