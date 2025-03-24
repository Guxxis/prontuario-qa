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
    let y = 10;

    // Adiciona texto ao PDF
    doc.text("Resultado da Validação", 10, y);
    y += 10;

    // Pega a pontuação gerada pelo PHP
    let pontuacaoFinal = document.getElementById("pontuacao").value;
    let pontuacaoPorcento = document.getElementById("pontuacaoPorcento").value;
    let pontuacaoStatus = document.getElementById("pontuacaoStatus").value;
    let formName = document.getElementById("nome").value;

    doc.text(`Pontuação: ${pontuacaoFinal}`, 10, y);
    y += 10;

    doc.text(`Aprovação: ${pontuacaoPorcento}%`, 10, y);
    y += 10;

    doc.text(`Status: ${pontuacaoStatus}`, 10, y);
    y += 10;

    doc.text(`Nome: ${formName}`, 10, y);
    y += 10;

    const inputItens = document.querySelectorAll("input.btn-check");
    inputItens.forEach(inputIten => {
        if (inputIten.checked === true && inputIten.value === "nao") {
            let itenKey = inputIten.name.split(";", 2);
            let itenName = itenKey[1];
            let itemCat = itenKey[0];

            const itenArray = itens.find(elemento => elemento.item === itenName);

            doc.text(`${itenArray.catLabel} - ${itenArray.itemLabel}`, 10, y);
            y += 10;

            console.log(itenName);

            // itens.forEach(valueIten => {

            // });
        }
    });


    //itens validação formulario
    itens.forEach(iten => {
        //se tiver como reprovado

        //grava categoria
        //grava iten
        //verificar se tem imagem e observação
        //grava imagem
        //grava observacao

    });

    //loop para criar as paginas
    //para cada categoria gravada com erro cria uma pagina
    //insere nome da pagina categoria
    //insere item com erro
    //se tiver image, insere
    //se tiver observacao, insere
    //vai pra proxima pagina

    // let itenComment = document.getElementById("text-multiple_page_titles").value;
    // doc.text(`Comentario: ${itenComment}`, 10, 60);

    // let fileInput = document.getElementById("file-multiple_page_titles");
    // let file = fileInput.files[0]; // Pega o primeiro arquivo carregado
    // let imgData = await loadImage(file);
    // if (imgData) {
    //     doc.addImage(imgData, "jpeg", 10, 70, 50, 50); // Adiciona ao PDF
    // }

    // Salva o PDF
    doc.save("validacao.pdf");
}

document.getElementById("btnGerarPDF").addEventListener("click", generatePDF);