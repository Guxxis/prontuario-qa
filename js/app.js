import { generatePDF } from "./module/pdf-generator.js";
import { formCalculator } from "./module/form-calculator.js";
import { renderForm } from "./module/form-render.js";
import { getJson } from "./module/get-json.js";
import { toggleAttach } from "./module/form-render.js";
import { formValidation } from "./module/form-validation.js";

async function init() {

    // let jsonItens = await getJson('./data/itens.json');
    let jsonItens = await getJson('./data/itens-test.json');
    let jsonDomains = await getJson('./data/dominios.json');
    let jsonAnalist = await getJson('./data/analistas.json');
    let imageList = {};

    const dataListDominios = document.getElementById("list-dominios");
    jsonDomains.forEach(dominio => {
        let option = document.createElement("option");
        option.value = dominio.dominio;
        dataListDominios.appendChild(option);
    });

    const dataListAnalista = document.getElementById("list-analistas");
    jsonAnalist.forEach(analista => {
        let option = document.createElement("option");
        option.value = analista.name;
        dataListAnalista.appendChild(option);
    });

    await renderForm(jsonItens, imageList);

    const form = document.querySelector('#formValidacao');
    const campos = form.querySelectorAll('input, textarea, select');

    // Carrega os dados
    campos.forEach(campo => {
        if (campo.type === 'radio' || campo.type === 'checkbox') {
            const checked = sessionStorage.getItem(campo.name + '_' + campo.value) === 'true';
            campo.checked = checked;
        } else if (campo.type !== 'file') {
            const valor = sessionStorage.getItem(campo.name);
            if (valor !== null) campo.value = valor;
        }
    });

    // Salvar a cada digitação
    campos.forEach(campo => {
        campo.addEventListener('input', () => {
            if (campo.type === 'radio' || campo.type === 'checkbox') {
                sessionStorage.setItem(campo.name + '_' + campo.value, campo.checked);
            } else if (campo.type === 'file') {
                // Não salva o arquivo, mas pode salvar o nome
                sessionStorage.setItem(campo.name, campo.files[0]?.name || '');
            } else {
                sessionStorage.setItem(campo.name, campo.value);
            }
        });
    });

    const orderSelect = document.getElementById("orderSelect");

    orderSelect.addEventListener("change", (e) => {
        renderForm(jsonItens, imageList, e.target.value);
    });

    document.getElementById("btnGerarPDF").addEventListener("click", (e) => {
        if (!formValidation(e)) {
            // e.preventDefault(); // Impede o envio se houver erro
        } else {
            generatePDF(jsonItens, imageList);
        }
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