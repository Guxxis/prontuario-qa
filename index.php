<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação de QA</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <?php include('validationItensKey.php') ?>
    <script>
        function gerarPdf() {

            var doc = new jsPDF()

            doc.text('Hello world!', 10, 10)
            doc.save('a4.pdf')
        }
    </script>
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

                    <button type="submit" class="btn btn-primary mt-3 col-12">Calcular Pontuação</button>
                    <!-- <button type="submit" onclick="gerarPdf()" class="btn btn-primary mt-3 col-12">Calcular Pontuação</button> -->
                </div>
                <div class="col-8 right-panel">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <?php

                            $beforeCat = "";
                            foreach ($itens as $key => $valueCat):
                                $cat = $valueCat['cat'];
                                $catLabel = $valueCat['cat-label'];

                                if ($beforeCat != $cat): ?>
                                    <div class="accordion-item form-section">
                                        <div class="row">
                                            <div class=" col-2">
                                            <p class="contadorProgresso">0 / 0</p>
                                            </div>
                                            <div class="col-10">
                                                <h2 class="accordion-header">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#<?= $cat ?>" aria-expanded="true" aria-controls="<?= $cat ?>">
                                                        <?= $catLabel ?>
                                                    </button>
                                                </h2>
                                            </div>
                                        </div>
                                        <div id="<?= $cat ?>" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                                <ul class="list-group">
                                                    <?php foreach ($itens as $key => $valueIten):
                                                        $catItem = $valueIten['cat'];
                                                        $item = $valueIten['item'];
                                                        $itemLabel = $valueIten['label'];
                                                        if ($cat == $catItem): ?>
                                                            <li class="list-group-item">

                                                                <div>
                                                                    <label class="form-label"><?= $valueIten['label'] ?></label><br>
                                                                    <input type="radio" class="btn-check" id="<?= "success-" . $item ?>" name="<?= $cat . ";" . $item ?>" value="sim" autocomplete="off">
                                                                    <label class="btn btn-outline-success" for="<?= "success-" . $item ?>">Aprovado</label>
                                                                    <input type="radio" class="btn-check" id="<?= "danger-" . $item ?>" name="<?= $cat . ";" . $item ?>" value="nao" autocomplete="off">
                                                                    <label class="btn btn-outline-danger" for="<?= "danger-" . $item ?>">Reprovado</label><br>
                                                                </div>
                                                            </li>
                                                    <?php
                                                        endif;
                                                    endforeach;
                                                    ?>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                            <?php
                                    $beforeCat = $cat;
                                endif;
                            endforeach;
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!-- Modal Bootstrap para exibir o resultado -->
    <div class="modal fade" id="resultadoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Resultado da Validação</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p id="resultadoTexto">Carregando...</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $("#formValidacao").submit(function(event) {
                event.preventDefault(); // Impede o redirecionamento

                $.ajax({
                    url: "processa_form2.php", // Caminho do seu arquivo PHP
                    type: "POST",
                    data: $(this).serialize(),
                    success: function(response) {
                        $("#resultadoTexto").html(response); // Exibe o resultado no modal

                        // Exibir o modal corretamente no Bootstrap 5
                        var modal = new bootstrap.Modal(document.getElementById("resultadoModal"));
                        modal.show();
                    },
                    error: function() {
                        $("#resultadoTexto").html("Erro ao calcular a pontuação.");
                        var modal = new bootstrap.Modal(document.getElementById("resultadoModal"));
                        modal.show();
                    }
                });
            });
        });
    </script>

    <script>
        $(document).ready(function() {
            function atualizarProgresso() {
                var totalGrupos = new Set();
                var preenchidos = new Set();

                // Percorre todos os inputs do tipo radio
                $("input[type='radio']").each(function() {
                    totalGrupos.add($(this).attr("name"));

                    if ($(this).is(":checked")) {
                        preenchidos.add($(this).attr("name"));
                    }
                });

                var progresso = Math.round((preenchidos.size / totalGrupos.size) * 100);

                $("#barraProgresso").css("width", progresso + "%").attr("aria-valuenow", progresso).text(progresso + "%");
            }

            // Dispara a função quando um radio for selecionado
            $("input[type='radio']").on("change", atualizarProgresso);
        });
    </script>

    <script>
        $(document).ready(function() {
            function atualizarContador(secao) {
                var totalGrupos = new Set();
                var preenchidos = new Set();

                // Conta os grupos (cada conjunto de radio buttons com o mesmo "name")
                $(secao).find("input[type='radio']").each(function() {
                    totalGrupos.add($(this).attr("name"));

                    if ($(this).is(":checked")) {
                        preenchidos.add($(this).attr("name"));
                    }
                });

                // Atualiza o contador de preenchimento da seção
                var contador = preenchidos.size + " / " + totalGrupos.size;
                $(secao).find(".contadorProgresso").text(contador);
            }

            // Atualiza o contador quando o usuário seleciona uma opção
            $(".form-section").each(function() {
                var secao = $(this);
                secao.find("input[type='radio']").on("change", function() {
                    atualizarContador(secao);
                });

                // Inicializa os contadores corretamente ao carregar a página
                atualizarContador(secao);
            });
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>