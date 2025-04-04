<!DOCTYPE html>
<html lang="pt">
<?php include('inc/validationItensKey.php') ?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação de QA</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


</head>

<body class="mt-5">
    <div class="container">
        <h2 class="col-12 text-center">Formulário de Validação de QA</h2>
    </div>
    <div class="container">
        <label for="orderSelect">Organizar por:</label>
        <select id="orderSelect">
            <option value="tool">Ferramenta</option>
            <option value="cat">Categoria</option>
        </select>

        <form class="mt-3 needs-validation" id="formValidacao" novalidate>
            <div class="row container-scroll">
                <div class="col-4 left-panel">

                    <div id="progress-container">
                        <p>Progresso Validação </p>
                        <div class="progress mb-3">
                            <div id="barraProgresso" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                        </div>
                        <div class="invalid-feedback">Falta Itens para Validar</div>
                    </div>

                    <!-- <label class="form-label" for="dominio">Dominio:</label>
                    <input class="form-control" type="text" id="dominio" name="dominio" placeholder="exemplo.com.br" required value="teste.com.br">

                    <label class="form-label" for="id-cliente">ID Cliente</label>
                    <input class="form-control" type="text" id="id-cliente" name="id-cliente" placeholder="000-00000-00" required value="25-20154-111">

                    <label class="form-label" for="id-card-runrunit">ID Card Runrun It</label>
                    <input class="form-control" type="number" id="id-card-runrunit" name="id-card-runrunit" required value="101202">

                    <label class="form-label" for="nome-analista-qa">Nome Analista de QA:</label>
                    <input class="form-control" type="text" id="nome-analista-qa" name="nome-analista-qa" placeholder="Nome Completo" required value="Gustavo">

                    <label class="form-label" for="data-validacao-site">Data de Validação do Site</label>
                    <input class="form-control" type="date" id="data-validacao-site" name="data-validacao-site" placeholder="00/00/0000" required>

                    <label class="form-label" for="nome-analista-producao">Nome Analista Produção</label>
                    <input class="form-control" type="text" id="nome-analista-producao" name="nome-analista-producao" placeholder="Nome Completo" required value="Leonardo">

                    <label class="form-label" for="data-producacao-site">Data de Finalização do Site</label>
                    <input class="form-control" type="date" id="data-producacao-site" name="data-producacao-site" placeholder="00/00/0000" required> -->

                    <label class="form-label" for="dominio">Dominio:</label>
                    <input class="form-control" type="text" id="dominio" name="dominio" placeholder="exemplo.com.br" required>

                    <label class="form-label" for="id-cliente">ID Cliente</label>
                    <input class="form-control" type="text" id="id-cliente" name="id-cliente" placeholder="000-00000-00" required>

                    <label class="form-label" for="id-card-runrunit">ID Card Runrun It</label>
                    <input class="form-control" type="number" id="id-card-runrunit" name="id-card-runrunit" placeholder="100100" required>

                    <label class="form-label" for="nome-analista-qa">Nome Analista de QA:</label>
                    <input class="form-control" type="text" id="nome-analista-qa" name="nome-analista-qa" placeholder="Nome Completo" required>

                    <label class="form-label" for="data-validacao-site">Data de Validação do Site</label>
                    <input class="form-control" type="date" id="data-validacao-site" name="data-validacao-site" required>

                    <label class="form-label" for="nome-analista-producao">Nome Analista Produção</label>
                    <input class="form-control" type="text" id="nome-analista-producao" name="nome-analista-producao" placeholder="Nome Completo" required>

                    <label class="form-label" for="data-producacao-site">Data de Finalização do Site</label>
                    <input class="form-control" type="date" id="data-producacao-site" name="data-producacao-site" required>


                    <button type="button" id="btnCalcular" class="btn btn-primary mt-3 col-12">Calcular Pontuação</button>

                    <input type="hidden" name="pontuacao" id="pontuacao" value="">
                    <input type="hidden" name="pontuacao-maximo" id="pontuacaoMaximo" value="">
                    <input type="hidden" name="pontuacao-porcento" id="pontuacaoPorcento" value="">
                    <input type="hidden" name="pontuacao-status" id="pontuacaoStatus" value="">

                    <div id="formResult"></div>

                    <button type="button" id="btnGerarPDF" class="btn btn-danger mt-3" style="display:none;">Gerar PDF</button>
                    <!-- <button type="submit" onclick="gerarPdf()" class="btn btn-primary mt-3 col-12">Calcular Pontuação</button> -->
                </div>
                <div class="col-8 right-panel">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div id="form-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script type="module" src="js/app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>

    </script>
</body>

</html>