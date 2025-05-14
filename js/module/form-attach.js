import { DataManager } from "./data-manager.js";
import { handleFiles } from "./handle-file.js";
import { handleAspectRatio } from "./handle-file.js";
import { compressImage } from "./handle-file.js";

function updateAttachPreview() {
    const storageItens = DataManager.load();

    Object.keys(storageItens[0].items).forEach(key => {
        const storageImages = storageItens[0].items[key].images
        const storageIndex = storageItens[0].items[key].item
        const preview = document.getElementById(`image-preview--${storageIndex}`)
        preview.innerHTML = "";

        //imagens itens
        storageImages.forEach((image, index) => {

            const imgPreview = document.createElement("img");
            imgPreview.src = image.base64;
            imgPreview.alt = image.name;
            imgPreview.title = image.name;

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.classList = "delete-button";

            deleteButton.addEventListener("click", () => {
                storageImages.splice(index, 1);
                DataManager.save(storageItens)
                updateAttachPreview(storageItens);
            });

            const divPreview = document.createElement("div");
            divPreview.classList = "preview";

            divPreview.appendChild(imgPreview);
            divPreview.appendChild(deleteButton);
            preview.appendChild(divPreview);
        })
    })

}



export function attachField() {

    updateAttachPreview();
    const dropAreas = document.querySelectorAll(".drop-area");
    let activeField = null;
    const maxWidth = 100;
    const maxHeight = 75;

    dropAreas.forEach((dropArea) => {
        const itemId = dropArea.id.split("--")[1]; // Pega o ID do item correspondente

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


        // Define campo ativo
        document.querySelectorAll(".drop-area").forEach(campo => {
            campo.addEventListener("click", () => {
                activeField = campo;  // Define qual campo está ativo
            });
        });

        // Manipula o drop
        dropArea.addEventListener("drop", async (e) => {

            dropArea.classList.remove("highlight");

            const files = e.dataTransfer.files;

            for (let file of files) {

                let imageUrl64 = await handleFiles(file);
                let imageCompressed = await compressImage(imageUrl64);
                let imageAspectRatio = await handleAspectRatio(imageUrl64, maxWidth, maxHeight);
                const dataImage = {
                    "name": "Clipboard Image",
                    "base64": imageCompressed,
                    "width": imageAspectRatio.width,
                    "height": imageAspectRatio.height,

                }
                DataManager.addImage(itemId, dataImage)
            }

            updateAttachPreview();
        });

        // Evento para colar imagem do clipboard
        dropArea.addEventListener("paste", async (e) => {
            if (!activeField) return;
            const files = e.clipboardData.items;

            for (const file of files) {

                const imgfile = file.getAsFile();

                let imageUrl64 = await handleFiles(imgfile);
                let imageCompressed = await compressImage(imageUrl64);
                let imageAspectRatio = await handleAspectRatio(imageUrl64, maxWidth, maxHeight);
                const dataImage = {
                    "name": "Clipboard Image",
                    "base64": imageCompressed,
                    "width": imageAspectRatio.width,
                    "height": imageAspectRatio.height,

                }
                DataManager.addImage(itemId, dataImage)
            }

            updateAttachPreview();

        });
    });


}
