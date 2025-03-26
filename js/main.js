import { construcInputForm } from "./form-inputs.js";
import { progressBar } from "./progress-bar.js";
import { countItens } from "./progress-bar.js";

async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
    }
    return await response.json();
}


document.addEventListener("DOMContentLoaded", async function () {

    let jsonItens = await getJson('itens.json');

    construcInputForm(jsonItens);

    progressBar();

    countItens();
    
});