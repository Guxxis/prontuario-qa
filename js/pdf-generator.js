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

    const inputItems = document.querySelectorAll("input.btn-check");
    const reprovedItems = [];
    inputItems.forEach(async inputItem => {
        if (inputItem.checked === true && inputItem.value === "nao") {
            const itenKey = inputItem.name.split(";", 2);

            //Tratando o nome do Item e Categoria
            const itenArray = itens.find(elemento => elemento.item === itenKey[1]);
            const itemName = itenArray.itemLabel;
            const itemCat = itenArray.catLabel;
            
            // doc.text(`${itenArray.catLabel} - ${itenArray.itemLabel}`, 10, y);
            // y += 10;
            //Tratando campo anexo
            const fileInput = document.getElementById(`file-${itenKey[1]}`);
            const file = fileInput.files[0]; // Pega o primeiro arquivo carregado
            const itemImage = await loadImage(file);
            
            //Tratando campo comentario
            const itemComment = document.getElementById(`text-${itenKey[1]}`).value;


            reprovedItems.push({
                "categoria": itemCat,
                "item": itemName,
                "image": itemImage,
                "comment": itemComment
            });
        }

    });


    console.log(reprovedItems);

    reprovedItems.forEach( reprovedItem => {
        
    })
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