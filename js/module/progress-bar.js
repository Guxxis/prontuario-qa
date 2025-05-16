export function progressBar() {

    $(document).ready(function () {
        function atualizarProgresso() {
            var totalGrupos = new Set();
            var preenchidos = new Set();

            $("input[type='radio']").each(function () {
                totalGrupos.add($(this).attr("name"));

                if ($(this).is(":checked")) {
                    preenchidos.add($(this).attr("name"));
                }
            });

            var progresso = Math.round((preenchidos.size / totalGrupos.size) * 100);

            $("#barraProgresso").css("width", progresso + "%").attr("aria-valuenow", progresso).text(progresso + "%");
        }

        $("input[type='radio']").on("change", atualizarProgresso);
    });
}

export function countItens() {

    $(document).ready(function () {
        function atualizarContador(secao) {
            var totalGrupos = new Set();
            var preenchidos = new Set();

            $(secao).find("input[type='radio']").each(function () {
                totalGrupos.add($(this).attr("name"));

                if ($(this).is(":checked")) {
                    preenchidos.add($(this).attr("name"));
                }
            });

            var contador = preenchidos.size + " / " + totalGrupos.size;
            $(secao).find(".contadorProgresso").text(contador);
        }

        $(".form-section").each(function () {
            var secao = $(this);
            secao.find("input[type='radio']").on("change", function () {
                atualizarContador(secao);
            });
            atualizarContador(secao);
        });
    });
}