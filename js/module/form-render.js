import { construcInputForm } from "./form-inputs.js";
import { progressBar, countItens } from "./progress-bar.js";
import { attachField } from "./form-attach.js";

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
export async function renderForm(jsonItens, imageList, orderBy = 'tool') {
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
        attachField(imageList);


    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

export function toggleAttach(event) {
    const itemId = event.target.id.split("-")[1]; // Pega o ID do item
    const anexoContainer = document.getElementById(`image-container-${itemId}`);

    if (event.target.value === "nao") {
        anexoContainer.style.display = "block"; // Mostra o campo de anexo
    } else {
        anexoContainer.style.display = "none"; // Esconde o campo de anexo
    }
}