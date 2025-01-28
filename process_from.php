<?php
// URL do Webhook no n8n
$webhook_url = "https://n8n.mpitemporario.com.br/webhook-test/a6e95088-60de-4f91-8085-58839802ecb6";

// Capturar os dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$dominio = $_POST['dominio'];

// Lógica de cálculo de pontos
$pontos = 0;

// Exemplo de cálculo de pontos (modifique conforme necessário)
if (!empty($nome)) { $pontos += 10; }
if (!empty($email)) { $pontos += 20; }
if (!empty($dominio)) { $pontos += 30; }

// Montar o array de dados
$data = [
    "nome" => $nome,
    "email" => $email,
    "dominio" => $dominio,
    "pontuacao" => $pontos
];

// Enviar os dados para o n8n via cURL
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

$response = curl_exec($ch);
curl_close($ch);

// Redirecionar ou exibir mensagem
echo "Dados enviados com sucesso!";
?>
