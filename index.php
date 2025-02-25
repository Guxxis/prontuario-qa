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
        <div class="col-md-4">

            <label class="form-label" for="nome">Nome:</label>
            <input class="form-control" type="text" id="nome" name="nome">
            <label class="form-label" for="email">Email</label>
            <input class="form-control" type="text" id="email" name="email">
        </div>
        <?php
        foreach ($itens as $key => $value) { ?>

            <div class="col-md-3">
                <label class="form-label"><?= $value['label'] ?></label><br>
                <input type="radio" name="<?= $valur['cat'] . $value['item'] ?>" value="sim" required> Aprovado
                <input type="radio" name="<?= $valur['cat'] . $value['item'] ?>" value="nao" required> Reprovado
            </div>
        <?php
        }
        ?>

        <button type="submit" class="btn btn-primary mt-3">Calcular Pontuação</button>
    </form>


</body>

</html>