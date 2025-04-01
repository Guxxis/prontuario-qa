import { construcInputForm } from "./module/form-inputs.js";
import { progressBar, countItens } from "./module/progress-bar.js";
import { generatePDF } from "./module/pdf-generator.js";

export async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
    }
    return await response.json();
}

function formCalculator (){
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
}

// Função para salvar os valores preenchidos
function saveFormData() {
    const inputs = document.querySelectorAll("input, textarea");
    const formData = {};
    inputs.forEach(input => {
        if (input.type === "radio") {
            if (input.checked) {
                formData[input.name] = input.value; // Salva apenas o radio selecionado
            }
        } else {
            formData[input.name] = input.value; // Salva os outros campos normalmente
        }
    });
    return formData;
}

// Função para restaurar os valores preenchidos
function restoreFormData(formData) {
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        if (input.type === "radio") {
            if (formData[input.name] === input.value) {
                input.checked = true; // Restaura o radio selecionado
            }
        } else if (formData[input.name]) {
            input.value = formData[input.name]; // Restaura os outros campos
        }
    });
}

// Função principal para renderizar o formulário
async function renderForm(jsonItens, orderBy = 'cat') {
    try {
        // const jsonItens = await getJson('./data/itens.json');

        // Salvar os dados preenchidos antes de limpar
        const savedData = saveFormData();

        // Limpa o formulário antes de renderizar novamente
        const formContainer = document.getElementById("form-container");
        formContainer.innerHTML = "";

        // Organiza o formulário com base na opção (categoria ou ferramenta)
        construcInputForm(jsonItens, orderBy);

        // Restaurar os dados preenchidos
        restoreFormData(savedData);

        // Atualiza a barra de progresso
        progressBar();
        countItens();

        
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

// Evento para atualizar o formulário com base na seleção
// document.addEventListener("DOMContentLoaded", async () => {


//     await renderForm();

//     // Captura a mudança no dropdown
//     const orderSelect = document.getElementById("orderSelect");
//     orderSelect.addEventListener("change", (e) => {
//         renderForm(e.target.value);
//     });

//     document.getElementById("btnGerarPDF").addEventListener("click", () => {
//         generatePDF(jsonItens)
//     });

// });

async function init (){
    
    let jsonItens = await getJson('./data/itens.json');

    await renderForm(jsonItens);
    // construcInputForm(jsonItens);

    const orderSelect = document.getElementById("orderSelect");
    orderSelect.addEventListener("change", (e) => {
        renderForm(jsonItens, e.target.value);
    });


    document.getElementById("btnGerarPDF").addEventListener("click", () => {
        generatePDF(jsonItens);
    });

    document.getElementById("btnCalcular").addEventListener("click", () => {
        
        
        formCalculator();
    });

}

init();