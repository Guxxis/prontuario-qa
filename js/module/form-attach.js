import { handleFiles } from "./handle-file.js";
import { handleAspectRatio } from "./handle-file.js";

function updateAttachPreview(categorys) {
    // preview.innerHTML = "";

    Object.keys(categorys).forEach(key => {
        const preview = document.getElementById(`image-preview-${key}`)
        preview.innerHTML = "";
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
                updateAttachPreview(categorys);
            });

            const divPreview = document.createElement("div");
            divPreview.classList = "preview";

            divPreview.appendChild(imgPreview);
            divPreview.appendChild(deleteButton);
            preview.appendChild(divPreview);
        })
    })

}



export function attachField(imageList) {
    if (imageList != "") {

        updateAttachPreview(imageList);
    }
    const dropAreas = document.querySelectorAll(".drop-area");
    let activeField = null;
    const maxWidth = 100;
    const maxHeight = 75;

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

                if (imageList[itemId].length >= 3) {
                    alert("Limite de imagens atingido");
                    break;
                }

                let imageUrl64 = await handleFiles(file);
                let imageAspectRatio = await handleAspectRatio(imageUrl64, maxWidth, maxHeight);
                imageList[itemId].push({
                    "name": file.name,
                    "base64": imageUrl64,
                    "width": imageAspectRatio.width,
                    "height": imageAspectRatio.height,
                });
            }

            updateAttachPreview(imageList);
        });

        document.querySelectorAll(".drop-area").forEach(campo => {
            campo.addEventListener("click", () => {
                activeField = campo;  // Define qual campo está ativo
            });
        });

        // Evento para colar imagem do clipboard
        dropArea.addEventListener("paste", async (e) => {
            if (!activeField) return;
            const files = e.clipboardData.items;

            for (const file of files) {
                if (!imageList[itemId]) {
                    imageList[itemId] = []; // Cria a chave se não existir
                }

                if (imageList[itemId].length >= 3) {
                    alert("Limite de imagens atingido");
                    break;
                }

                const imgfile = file.getAsFile();

                let imageUrl64 = await handleFiles(imgfile);
                let imageAspectRatio = await handleAspectRatio(imageUrl64, maxWidth, maxHeight);
                imageList[itemId].push({
                    "name": "Clipboard Image",
                    "base64": imageUrl64,
                    "width": imageAspectRatio.width,
                    "height": imageAspectRatio.height,
                });

                salvarImagensNoSessionStorage(imageList[itemId]);
            }

            updateAttachPreview(imageList);

        });
    });


}

function salvarImagensNoSessionStorage(performance) {
    try {
        sessionStorage.setItem('imagensProntuarioQA', JSON.stringify(performance));
        console.log('Imagens salvas no sessionStorage!');
    } catch (error) {
        console.error('Erro ao salvar imagens:', error);
        // Se o erro for por tamanho excessivo, comprima as imagens primeiro (veja abaixo)
    }
}

export function carregarImagensDoSessionStorage() {
    const imagensSalvas = sessionStorage.getItem('imagensProntuarioQA');
    if (imagensSalvas) {
        performance = JSON.parse(imagensSalvas); // Atualiza o array `performance`
        console.log('Imagens recuperadas:', performance);
        // Renderize as imagens no DOM se necessário
    }
}

// Execute ao carregar a página
window.addEventListener('load', carregarImagensDoSessionStorage);