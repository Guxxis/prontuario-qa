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

        #preview {
            margin-top: 15px;
            max-width: 100%;
        }
    </style>
</head>

<body class="mt-5">

    <h2>Arraste e solte ou cole uma imagem</h2>
    <div id="drop-area">
        <p>Arraste um arquivo aqui ou pressione Ctrl+V para colar</p>
        <input type="file" id="fileInput" style="display: none;">
        <img id="preview" style="display: none;">
    </div>

    <script>
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('fileInput');
        const preview = document.getElementById('preview');

        // Função para lidar com arquivos
        function handleFiles(file) {
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    preview.src = event.target.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(file);
            } else {
                alert("Apenas imagens são permitidas!");
            }
        }

        // Evento para arrastar e soltar
        dropArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropArea.classList.add("highlight");
        });

        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("highlight");
        });

        dropArea.addEventListener("drop", (e) => {
            e.preventDefault();
            dropArea.classList.remove("highlight");
            const file = e.dataTransfer.files[0];
            handleFiles(file);
        });

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