document.addEventListener("DOMContentLoaded", function () {


    const formContainer = document.getElementById("form-container");

    // Agrupar os itens por categoria
    const categorias = {};
    itens.forEach(valueIten => {
        if (!categorias[valueIten.cat]) {
            categorias[valueIten.cat] = [];
        }
        categorias[valueIten.cat].push(valueIten);
    });

    Object.keys(categorias).forEach(categoria => {

        //accordion-item
        //accordion-header
        //accordion-body

        // Criar um container para cada categoria
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
        accordionItem.classList.add("form-section");

        const accordionHeader = document.createElement("div");
        accordionHeader.classList.add("row");
        accordionHeader.innerHTML = `
            <div class=" col-2">
                <p class="contadorProgresso">0 / 0</p>
            </div>
            <div class="col-10">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#<?= $cat ?>" aria-expanded="true" aria-controls="<?= $cat ?>">
                        ${categoria}
                    </button>
                </h2>
            </div>
        `

        // Cabeçalho da categoria (com opção de recolher/expandir)
        const header = document.createElement("div");
        header.classList.add("category-header");
        header.innerHTML = `<strong>${categoria}</strong>`;

        // Lista de itens da categoria
        const itemList = document.createElement("ul");
        itemList.classList.add("list-group");
        itemList.style.display = "block"; // Default: visível

        categorias[categoria].forEach(valueIten => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");

            const divRow = document.createElement("div");
            divRow.classList.add("row");

            // Texto do item
            const colText = document.createElement("div");
            colText.classList.add("col-4");
            colText.innerHTML = `<label>${valueIten.item_label}</label>`;
            divRow.appendChild(colText);

            // Botões de Aprovação
            const colRadio = document.createElement("div");
            colRadio.classList.add("col-3");
            colRadio.innerHTML = `
                <input type="radio" class="btn-check" id="success-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="sim">
                <label class="btn btn-outline-success" for="success-${valueIten.item}">Aprovado</label>
                <input type="radio" class="btn-check" id="danger-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="nao">
                <label class="btn btn-outline-danger" for="danger-${valueIten.item}">Reprovado</label>
            `;
            divRow.appendChild(colRadio);

            // Botão de upload
            const colFile = document.createElement("div");
            colFile.classList.add("col-1");
            colFile.innerHTML = `
                <label for="file-${valueIten.item}" class="custom-file-label"><i class="fa-solid fa-paperclip"></i></label>
                <input type="file" id="file-${valueIten.item}" class="input-file">
            `;
            divRow.appendChild(colFile);

            // Campo de observações
            const colObs = document.createElement("div");
            colObs.classList.add("col");
            colObs.innerHTML = `
                <label for="text-${valueIten.item}">observações: </label>
                <input type="textarea" id="text-${valueIten.item}">
            `;
            divRow.appendChild(colObs);

            li.appendChild(divRow);
            itemList.appendChild(li);
        });

        // Adiciona um evento de clique para expandir/recolher a categoria
        header.addEventListener("click", () => {
            itemList.style.display = itemList.style.display === "none" ? "block" : "none";
        });

        categoryDiv.appendChild(header);
        categoryDiv.appendChild(itemList);
        formContainer.appendChild(categoryDiv);
    });
});