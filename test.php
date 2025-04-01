<!DOCTYPE html>
<html lang="pt">
<?php include('inc/validationItensKey.php') ?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload de Arquivo - Drag & Drop e Ctrl+V</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }

        #drop-area {
            border: 2px dashed #007bff;
            padding: 30px;
            width: 80%;
            max-width: 400px;
            margin: auto;
            background-color: #f8f9fa;
        }

        #drop-area.highlight {
            background-color: #e0e0e0;
        }

        #preview-area {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .preview {
            position: relative;
            display: inline-block;
        }

        .preview>img {
            height: 100px;
            width: 100px;
            object-fit: cover;
        }

        .preview>button {
            position: absolute;
            top: 5px;
            right: 5px;
            background-color: rgba(255, 0, 0, 0.6);
            color: white;
            border: none;
            padding: 5px;
            cursor: pointer;
        }

        .preview>button:hover {
            background-color: red;
        }
    </style>
</head>

<body class="mt-5">

    <h2>Arraste e solte ou cole uma imagem</h2>
    <div id="drop-area">
        <p>Arraste um arquivo aqui ou pressione Ctrl+V para colar</p>
        <input type="file" id="fileInput" style="display: none;">
        <div id="preview-area"></div>
    </div>

    <script>
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('fileInput');
        const preview = document.getElementById('preview-area');

        // Função para lidar com arquivos
        function handleFiles(file) {
            return new Promise((resolve, reject) => {

                if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        resolve(event.target.result);
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    }
                    reader.readAsDataURL(file);
                } else {
                    reject("Apenas imagens são permitidas!");
                }
            });
        }

        // Evento para arrastar e soltar
        dropArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropArea.classList.add("highlight");
        });

        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("highlight");
        });



        let fileListSanitizer = new Array();
        //adciona imagem na lista
        dropArea.addEventListener("drop", async (e) => {

            e.preventDefault();
            dropArea.classList.remove("highlight");

            const fileList = e.dataTransfer.files;
            for (let i = 0; i < fileList.length; i++) {

                if (fileListSanitizer.length >= 5) {

                    alert("Limite de imagens atingido");
                    break;
                }
                
                let urlBase64 = await handleFiles(fileList[i]);
                fileListSanitizer.push({
                    "name": fileList[i].name,
                    "base64": urlBase64
                });

            }

            updatePreview(fileListSanitizer);

        });

        //remove imagem da lista

        function updatePreview(fileListSanitizer) {
            preview.innerHTML = "";
            fileListSanitizer.forEach((file, index) => {

                const imgPreview = document.createElement("img");
                imgPreview.src = file.base64;
                imgPreview.alt = file.name;
                imgPreview.title = file.name;

                const deleteButton = document.createElement("button");
                deleteButton.innerText = "X";
                deleteButton.classList = "delete-button";

                deleteButton.addEventListener("click", () => {
                    fileListSanitizer.splice(index, 1);
                    updatePreview(fileListSanitizer);
                });

                const divPreview = document.createElement("div");
                divPreview.classList = "preview";

                divPreview.appendChild(imgPreview);
                divPreview.appendChild(deleteButton);
                preview.appendChild(divPreview);
            });
        }


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
    </script>
</body>

</html>