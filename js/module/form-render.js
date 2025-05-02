import { construcInputForm } from "./form-inputs.js";
import { progressBar, countItens } from "./progress-bar.js";
import { attachField } from "./form-attach.js";
import { DataManager } from "./data-manager.js";

export async function renderForm(jsonItens, orderBy = 'tool') {
    try {

        // Organiza o formulário com base na opção (categoria ou ferramenta)
        construcInputForm(jsonItens[0].items, orderBy);

        // Atualiza a barra de progresso
        progressBar();
        countItens();
        attachField();

        const form = document.querySelector('#formValidacao');
        const campos = form.querySelectorAll('input, textarea, select');
        
        // Carrega os dados
        campos.forEach(campo => {
            const storageItens = DataManager.load()[0];
            const fieldArray = campo.name.split('--');
            const fieldIndex = fieldArray[1]
            const fieldComp = fieldArray
            const itemIndex = storageItens.items.findIndex(item => item.item === fieldIndex);
            if (campo.type === 'radio' && campo.className === 'btn-check') {
                if (storageItens.items[itemIndex].approved === true) {
                    campo.checked = campo.value === 'sim' ? true : false;
                }
                if (storageItens.items[itemIndex].approved === false) {
                    campo.checked = campo.value === 'nao' ? true : false;
                    const attachContainer = document.getElementById(`image-container--${fieldIndex}`);
                    const commentContainer = document.getElementById(`text-container--${fieldIndex}`);
                    attachContainer.style.display = "block";
                    commentContainer.style.display = "block";
                }
            } else if (campo.type === 'text' && fieldComp === 'text-field'){
                campo.value = storageItens.items[itemIndex].comment;
            }
            Object.keys(storageItens).forEach(header => {
                if(campo.id == header) {
                    campo.value = storageItens[header];
                }
            })

        });

        // Salvar a cada digitação
        campos.forEach(campo => {
            campo.addEventListener('input', () => {
                const fieldArray = campo.name.split('--');
                const fieldIndex = fieldArray[1]
                const fieldComp = fieldArray[0]
                if (campo.type === 'radio' && campo.className === 'btn-check') {
                    const approved = campo.value == "sim" ? true : false;
                    DataManager.updateItem(fieldIndex, "approved", approved);
                } else if (campo.type === 'text' && fieldComp === 'text-field') {
                    DataManager.updateItem(fieldIndex, "comment", campo.value);
                } else {
                    DataManager.updateHeader(campo.id,campo.value)
                }
            });
        });


        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

export function toggleAttach(event) {
    const itemId = event.target.name.split("--")[1]; // Pega o ID do item
    const attachContainer = document.getElementById(`image-container--${itemId}`);
    const commentContainer = document.getElementById(`text-container--${itemId}`);

    if (event.target.value === "nao") {
        attachContainer.style.display = "block"; // Mostra o campo de anexo
        commentContainer.style.display = "block"; // Mostra o campo de anexo
    } else {
        attachContainer.style.display = "none"; // Esconde o campo de anexo
        commentContainer.style.display = "none"; // Esconde o campo de anexo
    }
}