<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Pesos dos itens
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
                } else {
                    foreach ($itens as $item){
                        if($catItem[0] == $item['cat'] && $catItem[1] == $item['item']){

                            array_push($erros,$item['label']);
                        }
                    }
                }
            }
        }
    }
    // var_dump($itens);
    // var_dump($pontuacao_maxima);

    $pontuacao_final_porcento = round(($pontuacao / $pontuacao_maxima) * 100, 2);
    $pontuacao_final_inteiro = $pontuacao;
}
?>

<?php if (isset($pontuacao_final_porcento)) : ?>
    <div class="mt-4">
        <h4>Resultado</h4>
        <p>Pontuação Final: <strong><?php echo $pontuacao_final_porcento; ?>%</strong></p>
        <p>Pontuação Final: <strong><?php echo $pontuacao_final_inteiro; ?></strong></p>
        <?php if (!empty($erros)) : ?>
            <h5>Erros Encontrados:</h5>
            <ul class="text-danger">
                <?php foreach ($erros as $erro) : ?>
                    <li><?php echo $erro; ?></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        <form method="post">
            <input type="hidden" name="pontuacao" value="<?php echo $pontuacao_final_porcento; ?>">
            <input type="hidden" name="erros" value="<?php echo implode(', ', $erros); ?>">
            <button type="submit" onclick="gerarPdf();" class="btn btn-danger mt-3">Baixar PDF</button>
        </form>
    </div>
<?php endif; ?>