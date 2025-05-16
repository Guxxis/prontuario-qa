import { generatePDF } from "./module/pdf-generator.js";
import { formCalculator } from "./module/form-calculator.js";
import { renderForm } from "./module/form-render.js";
import { getJson } from "./module/get-json.js";
import { toggleAttach } from "./module/form-render.js";
import { formValidation } from "./module/form-validation.js";
import { DataManager } from "./module/data-manager.js";
import { postData } from "./module/save-form.js";

function formInit(itemList) {
    const dataJSON = DataManager.load();
    if (dataJSON) {
        return dataJSON;
    } else {
        const itensIniciais = itemList;
        const formItems = itensIniciais.map(item => ({
            ...item,
            approved: null,
            comment: null,
            images: []
        }));
        const formJson = [{
            "dominio": null,
            "opTipo": null,
            "idCliente": null,
            "idTicket": null,
            "analistaQa": null,
            "dataValidacao": null,
            "analistaProducao": null,
            "dataProducao": null,
            "comentarioGeral": null,
            "items": formItems,
            "resultado": []
        }]
        DataManager.save(formJson);
        return formJson;
    }
}

async function init() {

    const hostDev = ['localhost', '127.0.0.1'].includes(window.location.hostname) || window.location.hostname.includes('homologacao');
    const ItensPath = hostDev ? './data/itens-test.json' : './data/itens.json';

    //Lista de Itens
    let jsonItens = await getJson(ItensPath);
    let jsonDomains = await getJson('./data/dominios.json');
    let jsonAnalist = await getJson('./data/analistas.json');

    //Construção do Storage
    const formInputs = formInit(jsonItens);

    //dataset Lista dos dominios
    const dataListDominios = document.getElementById("list-dominios");
    jsonDomains.forEach(dominio => {
        let option = document.createElement("option");
        option.value = dominio.dominio;
        dataListDominios.appendChild(option);
    });

    //dataset Lista dos Analistas
    const dataListAnalista = document.getElementById("list-analistas");
    jsonAnalist.forEach(analista => {
        let option = document.createElement("option");
        option.value = analista.name;
        dataListAnalista.appendChild(option);
    });

    //Renderizar formulario itens de validação
    await renderForm(formInputs);

    const orderSelect = document.getElementById("orderSelect");

    orderSelect.addEventListener("change", (e) => {
        renderForm(formInputs, e.target.value);
    });

    // Botao de Gerar PDF
    document.getElementById("btnGerarPDF").addEventListener("click", (e) => {
        if (!formValidation(e)) {
            // e.preventDefault(); // Impede o envio se houver erro
        } else {
            generatePDF();
            postData();
        }
    });

    //Botao de Calcular Pontuação
    document.getElementById("btnCalcular").addEventListener("click", () => {
        formCalculator();
    });

    //Evento de ativação dos campos escondidos quando reprovado
    document.addEventListener("change", (e) => {
        if (e.target.matches('.btn-check')) {
            toggleAttach(e);
        }
    });

}

init();