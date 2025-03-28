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

async function init (){
    let jsonItens = await getJson('./data/itens.json');

    construcInputForm(jsonItens);

    progressBar();

    countItens();

    document.getElementById("btnGerarPDF").addEventListener("click", () => {
        generatePDF(jsonItens)
    });

}

init();