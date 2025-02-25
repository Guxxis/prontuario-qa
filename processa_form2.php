<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Pesos dos itens
    $pesos = [
        "estrutura_semantica" => 2,
        "urls" => 3,
        "validacao_de_codigo" => 4,
        "performance" => 2,
        "metadados_e_seo" => 1
    ];

    $total_peso = array_sum($pesos);
    $pontuacao = 0;
    $erros = [];

    // Processando cada item
    foreach ($pesos as $item => $peso) {
        if (isset($_POST[$peso])) {
            $aprovado = $_POST[$peso] === "sim" ? 1 : 0;
            $pontuacao += $aprovado * $peso;
            if (!$aprovado) {
                $erros[] = ucfirst($item) . " não aprovado.";
            }
        }
    }
    var_dump($_POST);
    echo ($peso); 
    print_r($peso);
    $pontuacao_final_porcento = round(($pontuacao / $total_peso) * 100, 2);
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
        <form action="gerar_pdf.php" method="post">
            <input type="hidden" name="pontuacao" value="<?php echo $pontuacao_final_porcento; ?>">
            <input type="hidden" name="erros" value="<?php echo implode(', ', $erros); ?>">
            <button type="submit" class="btn btn-danger mt-3">Baixar PDF</button>
        </form>
    </div>
<?php endif; ?>