<?php
require 'vendor/autoload.php';

use Google\Cloud\BigQuery\BigQueryClient;

// Carregar .env se necessário
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '#') !== 0 && strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            putenv(trim($key) . '=' . trim($value));
        }
    }
}

$projectId = getenv('BIGQUERY_PROJECT_ID');
$keyFilePath = getenv('BIGQUERY_KEY_PATH');

$bigQuery = new BigQueryClient([
    'projectId' => $projectId,
    'keyFilePath' => $keyFilePath
]);

$dataset = $bigQuery->dataset(getenv('BIGQUERY_DATASET_ID'));
$table = $dataset->table(getenv('BIGQUERY_TABLE_ID'));

// Dados de teste
$row = [
    'nome' => 'Teste',
    'email' => 'teste@example.com',
    'mensagem' => 'Essa é uma mensagem de teste',
    'dataEnvio' => date('c') // timestamp ISO-8601
];

// Insere os dados
$insertResponse = $table->insertRow($row);

// Verifica sucesso ou erro
if ($insertResponse->isSuccessful()) {
    echo "✅ Dados inseridos com sucesso no BigQuery!";
} else {
    echo "❌ Erro ao inserir os dados:\n";
    foreach ($insertResponse->info()['insertErrors'] as $error) {
        echo "- " . $error['message'] . "\n";
    }
}
