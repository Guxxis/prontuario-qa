const dropAreas = document.querySelectorAll(".drop-area");
const anexosPorItem = {}; // Armazena imagens separadas por item

dropAreas.forEach((dropArea) => {
    const itemId = dropArea.dataset.item; // Pega o ID do item correspondente

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
    dropArea.addEventListener("drop", (e) => {
        dropArea.classList.remove("highlight");
        const files = e.dataTransfer.files;

        if (!anexosPorItem[itemId]) {
            anexosPorItem[itemId] = []; // Cria a chave se não existir
        }

        for (let file of files) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    anexosPorItem[itemId].push({
                        name: file.name,
                        base64: event.target.result
                    });

                    // Criar um preview da imagem na área correta
                    const previewContainer = document.querySelector(
                        `.preview-container[data-item="${itemId}"]`
                    );
                    const img = document.createElement("img");
                    img.src = event.target.result;
                    img.style.width = "100px";
                    img.style.margin = "5px";
                    previewContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Apenas imagens são permitidas!");
            }
        }
    });
});