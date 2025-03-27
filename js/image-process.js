addImages("Imagens do CTA", "ctaSugestoesn", function () {
    doc.save("formulario_seo.pdf");
});

function addImages(title, sectionId, callback) {
    let section = document.getElementById(sectionId);
    let containers = section.querySelectorAll("div");
    let files = [];

    containers.forEach(container => {
        let fileInput = container.querySelector("input[type='file']");
        let textInput = container.querySelector("textarea"); // Correto: Busca o textarea dentro do container

        if (fileInput && fileInput.files.length > 0) {
            files.push({ file: fileInput.files[0], description: textInput ? textInput.value.trim() : "" });
        }
    });

    if (files.length === 0) {
        callback();
        return;
    }

    let imagesProcessed = 0;

    if (y + 10 > marginBottom) {
        doc.addPage();
        y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text(title + ":", 10, y);
    y += 6;
    doc.setFont("helvetica", "normal");

    function processFile(index) {
        if (index >= files.length) {
            callback();
            return;
        }

        let { file, description } = files[index];
        let reader = new FileReader();

        reader.onload = function (event) {
            let img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                if (y + 60 > marginBottom) {
                    doc.addPage();
                    y = 20;
                }

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

                // Adicionar a descrição corretamente abaixo da imagem
                if (description) {
                    let splitText = doc.splitTextToSize("Descrição: " + description, 180);
                    doc.text(splitText, 10, y);
                    y += splitText.length * 6 + 4;
                }

                processFile(index + 1); // Processa a próxima imagem
            };
        };

        reader.readAsDataURL(file);
    }

    processFile(0); // Inicia o processamento das imagens
}