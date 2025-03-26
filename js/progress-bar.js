export function progressBar() {

    $(document).ready(function () {
        function atualizarProgresso() {
            var totalGrupos = new Set();
            var preenchidos = new Set();

            // Percorre todos os inputs do tipo radio
            $("input[type='radio']").each(function () {
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
}

export function countItens() {

    $(document).ready(function () {
        function atualizarContador(secao) {
            var totalGrupos = new Set();
            var preenchidos = new Set();

            // Conta os grupos (cada conjunto de radio buttons com o mesmo "name")
            $(secao).find("input[type='radio']").each(function () {
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
        $(".form-section").each(function () {
            var secao = $(this);
            secao.find("input[type='radio']").on("change", function () {
                atualizarContador(secao);
            });

            // Inicializa os contadores corretamente ao carregar a página
            atualizarContador(secao);
        });
    });
}