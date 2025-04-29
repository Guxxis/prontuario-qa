import { generatePDF } from "./module/pdf-generator.js";
import { formCalculator } from "./module/form-calculator.js";
import { renderForm } from "./module/form-render.js";
import { getJson } from "./module/get-json.js";
import { toggleAttach } from "./module/form-render.js";
import { formValidation } from "./module/form-validation.js";

function formInit(formJSON) {
    const itensJSON = sessionStorage.getItem('prontuarioValidacao');
    if (itensJSON) {
        return JSON.parse(itensJSON);
    } else {
        const itensIniciais = formJSON;
        const dadosUnificados = itensIniciais.map(item => ({
            ...item,
            approved: null,
            comment: "",
            images: []
        }));
        sessionStorage.setItem('prontuarioValidacao', JSON.stringify(dadosUnificados));
        return dadosUnificados;
    }
}

export function updateIten(itemId, campo, valor) {
    const dados = JSON.parse(sessionStorage.getItem('prontuarioValidacao'));
    const itemIndex = dados.findIndex(item => item.item === itemId);

    if (itemIndex >= 0) {
        dados[itemIndex][campo] = valor; // Ex.: "aprovado", "comentario"
        sessionStorage.setItem('prontuarioValidacao', JSON.stringify(dados));
    }
}

export function addImage(itemId, image) {
    const dados = JSON.parse(sessionStorage.getItem('prontuarioValidacao'));
    const itemIndex = dados.findIndex(item => item.item === itemId);

    if (itemIndex >= 0) {
        if (!dados[itemIndex].images) dados[itemIndex].images = [];
        dados[itemIndex].images.push(image);
        sessionStorage.setItem('prontuarioValidacao', JSON.stringify(dados));
    }
}

async function init() {

    //Lista de Itens
    // let jsonItens = await getJson('./data/itens.json');
    let jsonItens = await getJson('./data/itens-test.json');
    // let jsonDomains = await getJson('./data/dominios.json');
    // let jsonAnalist = await getJson('./data/analistas.json');
    // let imageList = {};

    const formInputs = formInit(jsonItens);

    // //dataset Lista dos dominios
    // const dataListDominios = document.getElementById("list-dominios");
    // jsonDomains.forEach(dominio => {
    //     let option = document.createElement("option");
    //     option.value = dominio.dominio;
    //     dataListDominios.appendChild(option);
    // });

    // //dataset Lista dos Analistas
    // const dataListAnalista = document.getElementById("list-analistas");
    // jsonAnalist.forEach(analista => {
    //     let option = document.createElement("option");
    //     option.value = analista.name;
    //     dataListAnalista.appendChild(option);
    // });

    //Renderizar formulario itens de validação
    await renderForm(formInputs);

    // const orderSelect = document.getElementById("orderSelect");

    // orderSelect.addEventListener("change", (e) => {
    //     renderForm(jsonItens, imageList, e.target.value);
    // });

    //Botao de Gerar PDF
    document.getElementById("btnGerarPDF").addEventListener("click", (e) => {
        if (!formValidation(e)) {
            // e.preventDefault(); // Impede o envio se houver erro
        } else {
            generatePDF(jsonItens, imageList);
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