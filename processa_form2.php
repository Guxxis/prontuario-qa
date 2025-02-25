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

    // Contando os itens por categoria
    foreach ($_POST as $key => $value) {
        foreach ($pesos as $categoria => $peso) {
            if (strpos($key, $categoria) === 0) {
                $itens_por_categoria[$categoria] = ($itens_por_categoria[$categoria] ?? 0) + 1;
            }
        }
        var_dump($value);
        var_dump($peso);
    }

    // Processando cada categoria
    foreach ($pesos as $categoria => $peso) {
        $itens_aprovados = 0;
        $total_itens = $itens_por_categoria[$categoria] ?? 1; // Evitar divisão por zero

        foreach ($_POST as $key => $value) {
            if (strpos($key, $categoria) === 0 && $value === "sim") {
                $itens_aprovados++;
            }
        }

        // Calcula a pontuação por item dentro da categoria
        $peso_por_item = $peso / $total_itens;
        $pontuacao += $itens_aprovados * $peso_por_item;

        if ($itens_aprovados < $total_itens) {
            $erros[] = ucfirst(str_replace('_', ' ', $categoria)) . " contém itens reprovados.";
        }
    }

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