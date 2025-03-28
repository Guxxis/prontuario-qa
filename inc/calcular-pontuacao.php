<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Pesos dos jsonItens
    $pesos = [
        "metadados_e_seo" => 5,
        "performance" => 5,
        "validacao_de_codigo" => 5,
        "urls" => 4,
        "estrutura_semantica" => 4,
        "fluxo" => 4,
        "imagens" => 3,
        "conteudo" => 3,
        "layout_e_usabilidade" => 3,
        "contato" => 2,
        "formularios" => 2,
        "resposta_do_servidor" => 1,
        "seguranca" => 1,
        "publicacao" => 1
    ];

    $total_peso = array_sum($pesos);
    $pontuacao = 0;
    $pontuacao_maxima = 0;
    $erros = [];
    include('validationItensKey.php');
    // Calculo dos itens aprovados
    foreach ($_POST as $key => $value) {
        $catItem = explode(";", $key, 2);

        // var_dump($catItem[0]);
        // var_dump($value);
        foreach ($pesos as $categoria => $peso) {
            if ($categoria == $catItem[0]) {
                $pontuacao_maxima += $peso;
                if ($value == "sim") {

                    // var_dump($categoria);
                    $pontuacao += $peso;
                }
            }
        }
    }
    // var_dump($itens);
    // var_dump($pontuacao_maxima);

    
    $pontuacao_final = $pontuacao;
    $pontuacao_porcento = round(($pontuacao / $pontuacao_maxima) * 100, 2);
    $pontuacao_status = "";

    if ($pontuacao_porcento >= 90){
        $pontuacao_status = "Aprovado";
    } else {
        $pontuacao_status = "Reprovado";
    }

    echo json_encode([
        "sucesso" => true,
        "pontuacao" => $pontuacao_final,
        "pontuacaoPorcento" => $pontuacao_porcento,
        "pontuacaoStatus" => $pontuacao_status
    ]);
}
?>