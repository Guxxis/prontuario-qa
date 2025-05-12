<?php
header('Content-Type: application/json');
require __DIR__ . '/bigquery.php';

// Ativa logs detalhados
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');


try {

    // $json = file_get_contents('php://input');
    // $data = json_decode($json, true);

    // Verifica método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        exit(json_encode(['erro' => 'Método não permitido']));
    }

    // Obtém dados brutos e decodifica
    $json = file_get_contents('php://input');
    if (empty($json)) {
        throw new Exception('Payload JSON vazio');
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON inválido: ' . json_last_error_msg());
    }

    error_log('Dados recebidos: ' . print_r($data, true));


    // $dados = [
    //     'nome' => $data['dominio'] ?? '',
    //     'email' => $data['dominio'] ?? '',
    //     'mensagem' => $data['dominio'] ?? '',
    // ];

    $dados = [
        "id" => $data["id"],
        "dominio" => $data["dominio"],
        "op_tipo" => $data["op_tipo"],
        "id_cliente" => $data["id_cliente"],
        "id_ticket" => $data["id_ticket"],
        "analista_qa" => $data["analista_qa"],
        "data_validacao" => $data["data_validacao"],
        "analista_producao" => $data["analista_producao"],
        "data_producao" => $data["data_producao"],
        "pontuacao" => $data["pontuacao"],
        "porcentagem" => $data["porcentagem"],
        "pontuacao_maxima" => $data["pontuacao_maxima"],
        "status" => $data["status"],
        "core_web_vitals" => [ 
            "performance" => $data["core_web_vitals"]["performance"],
        ],
        "metadados_seo" => [
            "paginas_mpis" => $data["metadados_seo"]["paginas_mpis"],
            "links_externos" => $data["metadados_seo"]["links_externos"],
        ],
        "validacao_codigo" => [
            "sem_arquivos_old"  => $data["validacao_codigo"]["sem_arquivos_old"]
        ]
    ];


    // Insere e aguarda resposta explícita
    $resultado = inserirNoBigQuery($dados);

    if ($resultado === true) {
        error_log('Inserção no BigQuery bem-sucedida');
        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Dados salvos com sucesso'
        ]);
        exit;
    }

    // Se chegou aqui, a inserção falhou
    error_log('Falha na inserção no BigQuery');
    http_response_code(500);
    echo json_encode([
        'erro' => 'Falha ao inserir no BigQuery',
        'detalhes' => 'A operação foi concluída mas não inseriu dados'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    // echo json_encode(['erro' => 'Falha ao inserir no BigQuery']);
    echo json_encode([
        'erro' => 'Exceção capturada',
        'mensagem' => $e->getMessage()
    ]);
}
