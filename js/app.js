import { generatePDF } from "./module/pdf-generator.js";
import { formCalculator } from "./module/form-calculator.js";
import { renderForm } from "./module/form-render.js";
import { getJson } from "./module/get-json.js";
import { toggleAttach } from "./module/form-render.js";

async function init() {

    let jsonItens = await getJson('./data/itens.json');
    let imageList = {};

    await renderForm(jsonItens, imageList);
    // construcInputForm(jsonItens);

    const orderSelect = document.getElementById("orderSelect");

    orderSelect.addEventListener("change", (e) => {
        renderForm(jsonItens, imageList, e.target.value);
    });

    document.getElementById("btnGerarPDF").addEventListener("click", () => {
        generatePDF(jsonItens, imageList);
    });

    document.getElementById("btnCalcular").addEventListener("click", () => {
        formCalculator();
    });

    document.addEventListener("change", (e) => {
        if (e.target.matches('.btn-check')) {
            toggleAttach(e);
        }
    });

}

init();