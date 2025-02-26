<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação de QA</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <?php include('validationItensKey.php') ?>
</head>

<body class="container mt-5">
    <h2>Formulário de Validação de QA</h2>
    <form action="processa_form2.php" method="post" class="mt-3">
        <div class="row">
            <div class="col-6">

                <label class="form-label" for="nome">Nome:</label>
                <input class="form-control" type="text" id="nome" name="nome">

                <label class="form-label" for="email">Email</label>
                <input class="form-control" type="text" id="email" name="email">

                <label class="form-label" for="analista_producao">Analista Produção</label>
                <input class="form-control" type="text" id="analista_producao" name="analista_producao">

                <label class="form-label" for="data_finalizacao">Data de Finalização do Site</label>
                <input class="form-control" type="text" id="data_finalizacao" name="data_finalizacao">

                <label class="form-label" for="data_publicacao">Data de Solicitação de Publicação</label>
                <input class="form-control" type="text" id="data_publicacao" name="data_publicacao">

                <label class="form-label" for="id_card_runrun_it">ID Card Runrun It</label>
                <input class="form-control" type="text" id="id_card_runrun_it" name="id_card_runrun_it">

                <label class="form-label" for="dominio">ID Cliente</label>
                <input class="form-control" type="text" id="dominio" name="dominio">
            </div>
            <div class="col-6">
                <?php
                foreach ($itens as $key => $value) { ?>

                    <div>
                        <label class="form-label"><?= $value['label'] ?></label><br>
                        <input type="radio" name="<?= $value['cat'] . ";" . $value['item'] ?>" value="sim" required> Aprovado
                        <input type="radio" name="<?= $value['cat'] . ";" . $value['item'] ?>" value="nao" required> Reprovado
                    </div>
                <?php
                }
                ?>
            </div>
        </div>

        <button type="submit" class="btn btn-primary mt-3">Calcular Pontuação</button>
    </form>


</body>

</html>