<?php
require __DIR__ . '/../vendor/autoload.php';

use Google\Cloud\BigQuery\BigQueryClient;
use Dotenv\Dotenv;

function loadEnv() {
    $envPath = __DIR__ . '/../';
    if (file_exists($envPath . '.env')) {
        $dotenv = Dotenv::createImmutable($envPath);
        $dotenv->load();
        
        $dotenv->required([
            'BIGQUERY_PROJECT_ID',
            'BIGQUERY_DATASET_ID',
            'BIGQUERY_TABLE_ID',
            'BIGQUERY_KEY_PATH'
        ]);
    } else {
        throw new Exception('Arquivo .env não encontrado em: ' . $envPath);
    }
}


function inserirNoBigQuery($dados)
{

    loadEnv();

    error_log('Dados recebidos para inserção: ' . print_r($dados, true));

    $projectId = $_ENV['BIGQUERY_PROJECT_ID'];
    $datasetId = $_ENV['BIGQUERY_DATASET_ID'];
    $tableId = $_ENV['BIGQUERY_TABLE_ID'];
    $keyFilePath = realpath(__DIR__ . '/' . $_ENV['BIGQUERY_KEY_PATH']);

    error_log("Configuração BigQuery:
        Project: $projectId
        Dataset: $datasetId
        Table: $tableId
        KeyPath: $keyFilePath");

    try {
        $bigQuery = new BigQueryClient([
            'projectId' => $projectId,
            'keyFilePath' => $keyFilePath
        ]);

        $dataset = $bigQuery->dataset($datasetId);
        $table = $dataset->table($tableId);

        $rows = [
            ['data' => $dados]  // Formato exigido pelo BigQuery
        ];

        error_log('Dados formatados para inserção: ' . print_r($rows, true));

        $insertResponse = $table->insertRows($rows);

        if ($insertResponse->isSuccessful()) {
            error_log('Inserção bem-sucedida');
            return true;
        }
        
        foreach ($insertResponse->failedRows() as $row) {
            error_log('Erro na inserção: ' . json_encode($row['errors']));
        }

    } catch (Exception $e) {
        error_log('EXCEÇÃO: ' . $e->getMessage());
        error_log('TRACE: ' . $e->getTraceAsString());
        return false;
    }
}
