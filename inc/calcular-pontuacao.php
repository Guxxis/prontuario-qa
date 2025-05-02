<?php
header('Content-Type: application/json');
try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //Pesos dos jsonItens
    $pesos = [
        "metadados_seo" => 5,
        "core_web_vitals" => 5,
        "validacao_codigo" => 5,
        "urls" => 4,
        "estrutura_semantica" => 4,
        "fluxo" => 4,
        "imagens" => 3,
        "conteudo" => 3,
        "layout_usabilidade" => 3,
        "contato" => 2,
        "formularios" => 2,
        "resposta_servidor" => 1,
        "seguranca" => 1,
        "publicacao" => 1
    ];

    $pontuacao = 0;
    $pontuacao_maxima = 0;

    foreach ($data['items'] as $item) {

        $categoria = $item['cat'];
        $aprovado = $item['approved'];

        if (isset($pesos[$categoria])) {
            $peso = $pesos[$categoria];
            $pontuacao_maxima += $peso;
            
            if ($aprovado) {
                $pontuacao += $peso;
            }
        } else {
            error_log("Categoria não encontrada: $categoria");
        }
    }

    if ($pontuacao_maxima <= 0) {
        throw new Exception("Nenhum item válido para cálculo");
    }

    $porcentagem  = round(($pontuacao / $pontuacao_maxima) * 100, 2);
    $status = ($porcentagem >= 90) ? "Aprovado" : "Reprovado";

    echo json_encode([
        "sucesso" => true,
        "pontuacao" => $pontuacao,
        "pontuacaoMax" => $pontuacao_maxima,
        "pontuacaoPorcento" => $porcentagem,
        "pontuacaoStatus" => $status
    ]);
} catch (Exception $e) {
    // Retorna erro se algo der errado
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => $e->getMessage(),
        'dadosRecebidos' => $data ?? null,
        'erroPHP' => error_get_last()
    ]);
}
