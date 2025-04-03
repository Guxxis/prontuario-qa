export function formCalculator (){
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
            document.getElementById("pontuacaoMaximo").value = data.pontuacaoMax;
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
}