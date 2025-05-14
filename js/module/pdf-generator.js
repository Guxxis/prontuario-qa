import { DataManager } from "./data-manager.js";

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

export async function generatePDF() {

    const formData = DataManager.load()[0];

    // Pega campos do formulario
    let formDomain = formData['dominio'];
    let formIdClient = formData['idCliente'];
    let formIdRunrunit = formData['idTicket'];
    let formNameQa = formData['analistaQa'];
    let formDataQA = formData['dataValidacao'];
    let formNameProd = formData['analistaProducao'];
    let formDataProd = formData['dataProducao'];
    let formComment = formData['comentarioGeral'];
    let formType = formData['opTipo'];

    let pontuacaoFinal = formData.resultado['pontuacao'];
    let pontuacaoPorcento = formData.resultado['porcentagem'];
    let pontuacaoStatus = formData.resultado['status'];

    //Criar array de itens reprovados
    let reprovedItems = new Array();
    for (const item of formData.items) {
        if (item.approved === false) {
            reprovedItems.push({
                "category": item.catLabel,
                "item": item.itemLabel,
                "comment": item.comment,
                "image": item.images,
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

    //Titulo
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#4278f5');
    doc.setFontSize(26);

    let y = 30;
    doc.text(`PRONTUÁRIO DE VALIDAÇÃO`, 220, y, { align: "center" });

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
    y += 15;
    doc.setLineWidth(1);
    doc.line(50, y, 395, y);

    //Resultado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    y += 16;
    doc.text(`Resultado: `, 15, y);
    doc.setTextColor(pontuacaoStatus == "Aprovado" ? '#26ab2c' : '#d95829');
    doc.text(`${pontuacaoStatus}`, 80, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000000');
    doc.setFontSize(12);
    doc.text(`Pontuação Final: ${pontuacaoFinal}`, 160, y);
    doc.text(`Porcentagem: ${pontuacaoPorcento}%`, 250, y);

    //Linha Separação
    y += 20;
    doc.setLineWidth(1);
    doc.line(50, y, 395, y);

    //Categorias com erros
    if (reprovedCat != "") {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#000000');
        doc.setFontSize(16);
        y += 25;
        doc.text(`Categorias com erros: `, 15, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#000000');
        doc.setFontSize(12);
        y += 10;
        Object.keys(reprovedCat).forEach(categoria => {
            y += 12;
            doc.text(`- ${categoria}`, 20, y);
        });
    } else {
        doc.text(`Site sem erros `, 15, y);
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#000000');
    doc.setFontSize(16);
    y += 25;
    doc.text(`Comentarios Gerais:  `, 15, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000000');
    doc.setFontSize(12);
    y += 16;
    doc.text(`${formComment}`, 20, y);

    //Rodapé
    doc.setFont('courier', 'bold');
    doc.setTextColor('#525252')
    doc.setFontSize(12);
    doc.text(`Página 1`, 225, 615, { align: "center" });

    //Criação de paginas para cada categoria
    let page = 1;
    Object.keys(reprovedCat).forEach(categoria => {
        page++
        doc.addPage();
        // marginPdf(doc);

        //Cabeçalho padrão
        let py = 22

        doc.setFont('courier', 'bold');
        doc.setTextColor('#00000');
        doc.setFontSize(16);
        doc.text(`Prontuário de Validação`, 20, py);

        doc.setFont('courier', 'normal');
        doc.setFontSize(12);
        doc.text(`${formDomain}`, 300, py);

        //Linha Separação
        py += 10;
        doc.setLineWidth(0, 5);
        doc.line(20, py, 425, py);

        //Titulo da Pagina
        py += 22;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#4278f5');
        doc.setFontSize(22);
        doc.text(`${categoria}`, 15, py);
        py += 10;

        //Itens de cada categoria
        reprovedCat[categoria].forEach(reprovedItem => {
            py += 14;
            doc.setFont('helvetica', 'normal');
            doc.setTextColor('#000000');
            doc.setFontSize(12);
            doc.text(`- ${reprovedItem["item"]}`, 20, py);

            //Caso tenha comentario
            if (reprovedItem["comment"] != null) {

                py += 12;
                doc.text(`teste.: ${reprovedItem["comment"].length}`, 30, py);
                
                py += 12;
                doc.setFont('times', 'normal');
                doc.setFontSize(12);
                doc.text(`obs.: ${reprovedItem["comment"]}`, 30, py);
            }

            //Caso tenha imagem
            py += 10;
            if (reprovedItem["image"].length > 0) {
                let px = 25
                for (let i = 0; i < reprovedItem["image"].length; i++) {
                    const imageBase64 = reprovedItem["image"][i].base64;
                    const imageWight = reprovedItem["image"][i].width;
                    const imageHeigth = reprovedItem["image"][i].height;
                    //caso ultrapasse tamanho da pagina
                    if ((px + imageHeigth) >= 435) {
                        py += 10 + imageHeigth;
                        px = 25;
                        doc.addImage(imageBase64, px, py, imageWight, imageHeigth);
                    } else {
                        doc.addImage(imageBase64, px, py, imageWight, imageHeigth);
                        px += 10 + imageWight;
                    }
                }
                py += 85;
            }
        })

        //Rodapé

        doc.setFont('courier', 'bold');
        doc.setTextColor('#525252')
        doc.setFontSize(12);
        doc.text(`Página ${page}`, 225, 615, { align: "center" });
    });


    // Salva o PDF
    doc.save(`prontuario-${formDomain}.pdf`);
}