function loadImage(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null); // Se não houver imagem, resolve imediatamente
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result); // Retorna a imagem em Base64
        };
        reader.onerror = reject; // Rejeita se der erro
    });
}

async function generatePDF() {
    const doc = new jsPDF();

    // Adiciona texto ao PDF
    doc.text("Resultado da Validação", 10, 10);

    // Pega a pontuação gerada pelo PHP
    let pontuacaoFinal = document.getElementById("pontuacao").value;
    let pontuacaoPorcento = document.getElementById("pontuacaoPorcento").value;
    let pontuacaoStatus = document.getElementById("pontuacaoStatus").value;
    let formName = document.getElementById("nome").value;
    let itenComment = document.getElementById("text-multiple_page_titles").value;

    let fileInput = document.getElementById("file-multiple_page_titles");
    let file = fileInput.files[0]; // Pega o primeiro arquivo carregado
    let imgData = await loadImage(file);


    doc.text(`Pontuação: ${pontuacaoFinal}`, 10, 20);
    doc.text(`Aprovação: ${pontuacaoPorcento}%`, 10, 30);
    doc.text(`Status: ${pontuacaoStatus}`, 10, 40);
    doc.text(`Nome: ${formName}`, 10, 50);
    doc.text(`Comentario: ${itenComment}`, 10, 60);


    if (imgData) {
        doc.addImage(imgData, "jpeg", 10, 70, 50, 50); // Adiciona ao PDF
    }

    // Salva o PDF
    doc.save("validacao.pdf");
}

document.getElementById("btnGerarPDF").addEventListener("click", generatePDF);