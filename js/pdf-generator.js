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

    // Pega a pontuação gerada pelo PHP
    let pontuacaoFinal = document.getElementById("pontuacao").value;
    let pontuacaoPorcento = document.getElementById("pontuacaoPorcento").value;
    let pontuacaoStatus = document.getElementById("pontuacaoStatus").value;
    let formName = document.getElementById("nome").value;

    doc.setFontSize(18);
    doc.text(`Prontuario de Validação`, 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Pontuação: ${pontuacaoFinal}`, 10, y);
    y += 10;

    doc.text(`Aprovação: ${pontuacaoPorcento}%`, 10, y);
    y += 10;

    doc.text(`Status: ${pontuacaoStatus}`, 10, y);
    y += 10;

    doc.text(`Nome: ${formName}`, 10, y);
    y += 10;

    const inputItems = document.querySelectorAll("input.btn-check");
    let reprovedItems = new Array();
    for (const inputItem of inputItems) {
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
                "category": itemCat,
                "item": itemName,
                "comment": itemComment,
                "image": itemImage,
            });
        }

    };


    const reprovedCat = {};
    reprovedItems.forEach(reprovedItem => {
        if (!reprovedCat[reprovedItem["category"]]) {
            reprovedCat[reprovedItem["category"]] = [];
        }
        reprovedCat[reprovedItem["category"]].push(reprovedItem);
    });

    doc.setFontSize(16);
    if (reprovedCat != "") {
        doc.text(`Categorias com erros: `, 10, y);
        y += 10;
        doc.setFontSize(12);
        Object.keys(reprovedCat).forEach(categoria => {
            doc.text(`- ${categoria}`, 15, y);
            y += 10;
        });
    }else{
        doc.text(`Site sem erros `, 10, y);
        y += 10;
    }

    Object.keys(reprovedCat).forEach(categoria => {
        doc.addPage('a4');
        py = 10
        doc.setFontSize(18);
        doc.text(`${categoria}: `, 10, py);
        py += 10;

        reprovedCat[categoria].forEach(reprovedItem => {
            doc.setFontSize(12);
            doc.text(`- ${reprovedItem["item"]}`, 15, py);
            py += 10;
            if (reprovedItem["comment"]) {
                doc.text(`Comentario - ${reprovedItem["comment"]}`, 20, py);
                py += 10;
            }
            if (reprovedItem["image"]) {
                doc.addImage(reprovedItem["image"], "jpeg", 20, py, 50, 50); // Adiciona ao PDF
                py += 60;
            }
        })
    });



    // Salva o PDF
    doc.save("validacao.pdf");
}

document.getElementById("btnGerarPDF").addEventListener("click", generatePDF);