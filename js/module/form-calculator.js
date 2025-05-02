import { DataManager } from "./data-manager.js";

export function formCalculator() {
    let formData = DataManager.load()[0].items;
    fetch("inc/calcular-pontuacao.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: formData
        })
    })
        .then(response => response.json())
        .then(data => {
            if (!data.sucesso) {
                throw new Error(data.mensagem || "Erro desconhecido no servidor");
            }

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
        })
        .catch(error => {
            console.error("Erro ao calcular pontuação:", error);
            alert("Erro ao calcular pontuação: " + error.message);
        });
}