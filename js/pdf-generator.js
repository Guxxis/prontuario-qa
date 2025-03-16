document.getElementById("btnGerarPDF").addEventListener("click", function () {
    const doc = new jsPDF();

    // Adiciona texto ao PDF
    doc.text("Resultado da Validação", 10, 10);

    // Pega a pontuação gerada pelo PHP
    let pontuacaoFinal = document.getElementById("pontuacao").value;
    let pontuacaoPorcento = document.getElementById("pontuacaoPorcento").value;
    let pontuacaoStatus = document.getElementById("pontuacaoStatus").value;
    let formName = document.getElementById("nome").value;
    // let itenAttach = document.getElementById("file-multiple_page_titles");
    let itenComment = document.getElementById("text-multiple_page_titles").value;

    // console.log(itenAttach);

    doc.text(`Pontuação: ${pontuacaoFinal}`, 10, 20);
    doc.text(`Aprovação: ${pontuacaoPorcento}%`, 10, 30);
    doc.text(`Status: ${pontuacaoStatus}`, 10, 40);
    doc.text(`Nome: ${formName}`, 10, 50);
    doc.text(`Nome: ${itenComment}`, 10, 60);

    let fileInput = document.getElementById("file-multiple_page_titles");
    let file = fileInput.files[0]; // Pega o primeiro arquivo carregado

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file); // Converte para Base64
        reader.onload = function () {
            let imgData = reader.result; // Base64 da imagem
            doc.addImage(imgData, "PNG", 10, 70, 50, 50); // Adiciona ao PDF
            doc.save("validacao.pdf");
        };
    }

    // Salva o PDF
});