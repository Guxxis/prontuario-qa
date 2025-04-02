import { generatePDF } from "./module/pdf-generator.js";
import { formCalculator } from "./module/form-calculator.js";
import { renderForm } from "./module/form-render.js";
import { getJson } from "./module/get-json.js";
import { toggleAttach } from "./module/form-render.js";

function handleFiles(file) {
    return new Promise((resolve, reject) => {

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(event) {
                resolve(event.target.result);
            };
            reader.onerror = function(error) {
                reject(error);
            }
            reader.readAsDataURL(file);
        } else {
            reject("Apenas imagens são permitidas!");
        }
    });
}

function updatePreview(categorys) {
    // preview.innerHTML = "";
    
    // console.log(fileListSanitizer);
    Object.keys(categorys).forEach(key => {
        const preview = document.getElementById(`image-preview-${key}`)
        preview.innerHTML="";
        //imagens itens
        categorys[key].forEach((image, index) => {

            const imgPreview = document.createElement("img");
            imgPreview.src = image.base64;
            imgPreview.alt = image.name;
            imgPreview.title = image.name;
    
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.classList = "delete-button";
    
            deleteButton.addEventListener("click", () => {
                categorys[key].splice(index, 1);
                updatePreview(categorys);
            });
    
            const divPreview = document.createElement("div");
            divPreview.classList = "preview";
    
            divPreview.appendChild(imgPreview);
            divPreview.appendChild(deleteButton);
            preview.appendChild(divPreview);
        })
    })

}

async function init() {

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

    document.addEventListener("change", (e) => {
        if (e.target.matches('.btn-check')) {
            toggleAttach(e);
        }
    });

    document.addEventListener("change", () =>{

    })
    const dropAreas = document.querySelectorAll(".drop-area");
    const imageList = {};
    dropAreas.forEach((dropArea) => {
        const itemId = dropArea.id.split("-")[2]; // Pega o ID do item correspondente
    
        // Prevenir comportamentos padrões
        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            dropArea.addEventListener(eventName, (e) => e.preventDefault(), false);
        });
    
        // Adiciona uma borda ao passar por cima
        dropArea.addEventListener("dragover", () => {
            dropArea.classList.add("highlight");
        });
    
        // Remove a borda quando sai
        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("highlight");
        });
    
        // Manipula o drop
        dropArea.addEventListener("drop", async (e) => {

            dropArea.classList.remove("highlight");

            const files = e.dataTransfer.files;
    
            if (!imageList[itemId]) {
                imageList[itemId] = []; // Cria a chave se não existir
            }
    
            for (let file of files) {

                if(imageList[itemId].length >=5 ){
                    alert("Limite de imagens atingido");
                    break;
                }

                let imageUrl64 = await handleFiles(file);
                imageList[itemId].push({
                    "name": file.name,
                    "base64": imageUrl64
                });
            }

            updatePreview(imageList);
        });
    });

}

init();