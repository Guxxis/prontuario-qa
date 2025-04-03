function loadImage(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null); // Se não houver imagem, resolve imediatamente
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            let img = new Image();
            img.src = event.target.result;
            img.onload = function () {

                let maxWidth = 150;
                let maxHeight = 150;
                let imgWidth = img.width;
                let imgHeight = img.height;

                if (imgWidth > imgHeight) {
                    let scale = maxWidth / imgWidth;
                    imgWidth = maxWidth;
                    imgHeight *= scale;
                } else {
                    let scale = maxHeight / imgHeight;
                    imgHeight = maxHeight;
                    imgWidth *= scale;
                }

                doc.addImage(event.target.result, 'JPEG', 10, y, imgWidth, imgHeight);
                y += imgHeight + 5;

                processFile(index + 1); // Processa a próxima imagem
                resolve(reader.result); // Retorna a imagem em Base64
            };

        };
        reader.onerror = reject; // Rejeita se der erro
    });
}

function marginPdf(doc) {
    //margin x
    let mx = 0;
    let xLine = 5
    for (let i = 0; i < xLine; i++) {
        doc.setLineWidth(0.5);
        doc.line(mx, 10, (mx += 99), 10);
        // mx += 99;
        doc.setLineWidth(3);
        doc.line(mx, 10, (mx += 1), 10);
    }
    //margin y
    let my = 0;
    let yLine = 7
    for (let i = 0; i < yLine; i++) {
        doc.setLineWidth(0.5);
        doc.line(10, my, 10, my += 99);
        // my += 99;
        doc.setLineWidth(3);
        doc.line(10, my, 10, my += 1);
    }
}

export async function generatePDF(jsonItens, imageList) {

    // Pega campos do formulario
    let formDomain = document.getElementById("dominio").value;
    let formIdClient = document.getElementById("id-cliente").value;
    let formIdRunrunit = document.getElementById("id-card-runrunit").value;
    let formNameQa = document.getElementById("nome-analista-qa").value;
    let formDataQA = document.getElementById("data-validacao-site").value;
    let formNameProd = document.getElementById("nome-analista-producao").value;
    let formDataProd = document.getElementById("data-producacao-site").value;

    let pontuacaoFinal = document.getElementById("pontuacao").value;
    let pontuacaoPorcento = document.getElementById("pontuacaoPorcento").value;
    let pontuacaoMax = document.getElementById("pontuacaoMaximo").value;
    let pontuacaoStatus = document.getElementById("pontuacaoStatus").value;

    //Criar array de itens reprovados
    const inputItems = document.querySelectorAll("input.btn-check");
    let reprovedItems = new Array();
    for (const inputItem of inputItems) {
        if (inputItem.checked === true && inputItem.value === "nao") {
            const itenKey = inputItem.name.split(";", 2);

            //Tratando o nome do Item e Categoria
            const itenArray = jsonItens.find(elemento => elemento.item === itenKey[1]);
            const itemName = itenArray.itemLabel;
            const itemCat = itenArray.catLabel;

            const imageItemList = imageList[itenKey[1]];

            //Tratando campo anexo
            // const fileInput = document.getElementById(`file-${itenKey[1]}`);
            // const file = fileInput.files[0]; // Pega o primeiro arquivo carregado
            // const itemImage = await loadImage(file);

            //Tratando campo comentario
            // const itemComment = document.getElementById(`text-${itenKey[1]}`).value;


            reprovedItems.push({
                "category": itemCat,
                "item": itemName,
                // "comment": itemComment,
                "image": imageItemList,
            });
        }

    };

    //Organiza a array dos erros por categoria
    const reprovedCat = {};
    reprovedItems.forEach(reprovedItem => {
        if (!reprovedCat[reprovedItem["category"]]) {
            reprovedCat[reprovedItem["category"]] = [];
        }
        reprovedCat[reprovedItem["category"]].push(reprovedItem);
    });


    //PDF Construção
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
    });

    // marginPdf(doc);

    //Titulo
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#4278f5');
    doc.setFontSize(26);

    let y = 30;
    doc.text(`PRONTUARIO DE VALIDAÇÃO`, 220, y, { align: "center" });

    //Linha Separação
    y += 10;
    doc.setLineWidth(2);
    doc.line(20, y, 425, y);

    //Cabeçalho
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000000');
    doc.setFontSize(12);

    y += 20;
    doc.text(`ID Cliente: ${formIdClient}`, 15, y);
    doc.text(`Domínio: ${formDomain}`, 200, y);

    y += 20;
    doc.text(`ID Runrun It: ${formIdRunrunit}`, 15, y);

    y += 12;
    doc.text(`Data de Validação: ${formDataQA}`, 15, y);
    doc.text(`Analista QA: ${formNameQa}`, 200, y);

    y += 12;
    doc.text(`Data de Produção: ${formDataProd}`, 15, y);
    doc.text(`Analista Desenvolvedor: ${formNameProd}`, 200, y);

    //Linha Separação
    y += 10;
    doc.setLineWidth(1);
    doc.line(50, y, 395, y);

    //Resultado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    y += 16;
    doc.text(`Resultado: `, 15, y);
    doc.setTextColor(pontuacaoStatus == "Aprovado" ? '#26ab2c' : '#d95829');
    doc.text(`${pontuacaoStatus}`, 100, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000000');
    doc.setFontSize(12);

    y += 20;
    doc.text(`Maxima: ${pontuacaoMax}`, 15, y);
    doc.text(`Final: ${pontuacaoFinal}`, 75, y);
    doc.text(`Porcentagem: ${pontuacaoPorcento}%`, 125, y);

    //Linha Separação
    y += 10;
    doc.setLineWidth(1);
    doc.line(50, y, 395, y);

    //Categorias com erros
    if (reprovedCat != "") {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#000000');
        doc.setFontSize(16);
        y += 16;
        doc.text(`Categorias com erros: `, 15, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#000000');
        doc.setFontSize(12);
        Object.keys(reprovedCat).forEach(categoria => {
            y += 12;
            doc.text(`- ${categoria}`, 20, y);
        });
    } else {
        doc.text(`Site sem erros `, 15, y);
    }

    //Criação de paginas para cada categoria
    Object.keys(reprovedCat).forEach(categoria => {
        doc.addPage();
        let py = 10
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
                let px = 20
                for (let i = 0; i < reprovedItem["image"].length; i++) {
                    doc.addImage(reprovedItem["image"][i].base64, "jpeg", px, py, 70, 70); // Adiciona ao PDF
                    px += 75;
                }
                py += 75;
            }
        })
    });



    // Salva o PDF
    doc.save("validacao.pdf");
}

