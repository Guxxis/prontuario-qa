const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

// Função para lidar com arquivos
function handleFiles(file) {
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (event) {
            preview.src = event.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Apenas imagens são permitidas!");
    }
}

// Evento para arrastar e soltar
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("highlight");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("highlight");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("highlight");
    const file = e.dataTransfer.files[0];
    handleFiles(file);
});

// Evento para colar imagem do clipboard (Ctrl+V)
document.addEventListener("paste", (e) => {
    const items = e.clipboardData.items;
    for (const item of items) {
        if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            handleFiles(file);
        }
    }
});