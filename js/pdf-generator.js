document.getElementById("btnGerarPDF").addEventListener("click", function () {
    const doc = new jsPDF();

    // Adiciona texto ao PDF
    doc.text("Resultado da Validação", 10, 10);

    // Pega a pontuação gerada pelo PHP
    let pontuacaoFinal = document.getElementById("pontuacao").value;
    let pontuacaoPorcento = document.getElementById("pontuacaoPorcento").value;
    let pontuacaoStatus = document.getElementById("pontuacaoStatus").value;
    doc.text(`Pontuação final: ${pontuacaoFinal}`, 10, 20);
    doc.text(`Pontuação final: ${pontuacaoPorcento}`, 10, 30);
    doc.text(`Pontuação final: ${pontuacaoStatus}`, 10, 40);

    // Salva o PDF
    doc.save("validacao.pdf");
});