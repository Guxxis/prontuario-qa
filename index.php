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

        <form class="mt-3" id="formValidacao">
            <div class="row container-scroll">
                <div class="col-4 left-panel">

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

                    <div class="progress mt-3">
                        <div id="barraProgresso" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                    </div>

                    <button type="button" id="btnCalcular" class="btn btn-primary mt-3 col-12">Calcular Pontuação</button>

                    <input type="hidden" name="pontuacao" id="pontuacao" value="">
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
    

    <script>
        document.getElementById("btnCalcular").addEventListener("click", function() {
            let formData = new FormData(document.getElementById("formValidacao"));

            fetch("inc/calcular-pontuacao.php", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json()) // Retorna JSON do PHP
                .then(data => {
                    if (data.sucesso) {
                        // Atualizar campo oculto com a pontuação
                        document.getElementById("pontuacao").value = data.pontuacao;
                        document.getElementById("pontuacaoPorcento").value = data.pontuacaoPorcento;
                        document.getElementById("pontuacaoStatus").value = data.pontuacaoStatus;

                        const formResultDiv = document.getElementById("formResult");
                        formResultDiv.innerHTML = `
                            <p>Pontuação: ${data.pontuacao}</p>
                            <p>Porcentagem: ${data.pontuacaoPorcento}</p>
                            <p>Situação: ${data.pontuacaoStatus}</p>
                        `;

                        document.getElementById("btnGerarPDF").style.display = "inline-block";


                    }
                })
                .catch(error => console.error("Erro ao calcular pontuação:", error));
        });
    </script>

    <script>
        <?php include("js/pdf-generator.js");?>
    </script>

    <script src="js/items-list.js"></script>
    <script src="js/form-inputs.js"></script>
    <script src="js/progress-bar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>