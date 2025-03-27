import { construcInputForm } from "./module/form-inputs.js";
import { progressBar, countItens } from "./module/progress-bar.js";

async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
    }
    return await response.json();
}

document.addEventListener("DOMContentLoaded", async function () {

    let jsonItens = await getJson('./data/itens.json');

    construcInputForm(jsonItens);

    progressBar();

    countItens();

});