async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
    }
    return await response.json();
}

function construcInputForm (jsonItens){
    const formContainer = document.getElementById("form-container");
    // Agrupar os itens por categoria
    const categorias = {};
    jsonItens.forEach(valueIten => {
        if (!categorias[valueIten.cat]) {
            categorias[valueIten.cat] = [];
        }
        categorias[valueIten.cat].push(valueIten);
    });


    console.log(categorias);


    Object.keys(categorias).forEach(categoria => {
        // Criar um container para cada categoria
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("accordio-item");
        categoryDiv.classList.add("form-section");

        // Criar div do Cabeçalho
        const divRowCat = document.createElement("div");
        divRowCat.classList.add("row");


        // Progresso da Categoria
        const progressDiv = document.createElement("div");
        progressDiv.classList.add("col-2");
        progressDiv.innerHTML = `<p class="contadorProgresso">0 / 0</p>`


        // Cabeçalho da categoria (com opção de recolher/expandir)
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("col-10");
        headerDiv.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${categoria}" aria-expanded="true" aria-controls="${categoria}">
                    ${categorias[categoria][0].catLabel}
                </button>
            </h2>
        `;

        divRowCat.appendChild(progressDiv);
        divRowCat.appendChild(headerDiv);
        categoryDiv.appendChild(divRowCat);

        // 
        const accordionCollapse = document.createElement('div');
        accordionCollapse.id = categoria;
        accordionCollapse.classList.add("accordion-collapse", "collapse");
        accordionCollapse.setAttribute("data-bs-parent", "#accordionFlushExample");

        const accordionBody = document.createElement('div');
        accordionBody.classList.add("accordion-body");


        accordionCollapse.appendChild(accordionBody);

        // Lista de itens da categoria
        const itemList = document.createElement("ul");
        itemList.classList.add("list-group");

        categorias[categoria].forEach(valueIten => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");

            const divRowItem = document.createElement("div");
            divRowItem.classList.add("row");

            // Texto do item
            const colText = document.createElement("label");
            colText.classList.add("form-label");
            colText.innerText = `${valueIten.itemLabel}`;

            // Botões de Aprovação
            const colRadio = document.createElement("div");
            colRadio.classList.add("col-4");
            colRadio.innerHTML = `
                <input type="radio" class="btn-check" id="success-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="sim">
                <label class="btn btn-outline-success" for="success-${valueIten.item}">Aprovado</label>
                <input type="radio" class="btn-check" id="danger-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="nao">
                <label class="btn btn-outline-danger" for="danger-${valueIten.item}">Reprovado</label>
            `;
            divRowItem.appendChild(colRadio);

            // Botão de upload
            const colFile = document.createElement("div");
            colFile.classList.add("col-1");
            colFile.innerHTML = `
                <label for="file-${valueIten.item}" class="custom-file-label"><i class="fa-solid fa-paperclip"></i></label>
                <input type="file" id="file-${valueIten.item}" class="input-file">
            `;
            divRowItem.appendChild(colFile);

            // Campo de comentario
            const colObs = document.createElement("div");
            colObs.classList.add("col");
            colObs.innerHTML = `
                <label for="text-${valueIten.item}">obs: </label>
                <input type="textarea" id="text-${valueIten.item}">
            `;
            divRowItem.appendChild(colObs);

            li.appendChild(colText);
            li.appendChild(divRowItem);
            itemList.appendChild(li);
        });

        // Adiciona um evento de clique para expandir/recolher a categoria
        // header.addEventListener("click", () => {
        //     itemList.style.display = itemList.style.display === "none" ? "block" : "none";
        // });

        accordionCollapse.appendChild(itemList);
        categoryDiv.appendChild(accordionCollapse);
        formContainer.appendChild(categoryDiv);
    });
}

document.addEventListener("DOMContentLoaded", async function () {

    let jsonItens = await getJson('itens.json');

    // construcInputForm(jsonItens);

    const formContainer = document.getElementById("form-container");
    // Agrupar os itens por categoria
    const categorias = {};
    jsonItens.forEach(valueIten => {
        if (!categorias[valueIten.cat]) {
            categorias[valueIten.cat] = [];
        }
        categorias[valueIten.cat].push(valueIten);
    });


    console.log(categorias);


    Object.keys(categorias).forEach(categoria => {
        // Criar um container para cada categoria
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("accordio-item");
        categoryDiv.classList.add("form-section");

        // Criar div do Cabeçalho
        const divRowCat = document.createElement("div");
        divRowCat.classList.add("row");


        // Progresso da Categoria
        const progressDiv = document.createElement("div");
        progressDiv.classList.add("col-2");
        progressDiv.innerHTML = `<p class="contadorProgresso">0 / 0</p>`


        // Cabeçalho da categoria (com opção de recolher/expandir)
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("col-10");
        headerDiv.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${categoria}" aria-expanded="true" aria-controls="${categoria}">
                    ${categorias[categoria][0].catLabel}
                </button>
            </h2>
        `;

        divRowCat.appendChild(progressDiv);
        divRowCat.appendChild(headerDiv);
        categoryDiv.appendChild(divRowCat);

        // 
        const accordionCollapse = document.createElement('div');
        accordionCollapse.id = categoria;
        accordionCollapse.classList.add("accordion-collapse", "collapse");
        accordionCollapse.setAttribute("data-bs-parent", "#accordionFlushExample");

        const accordionBody = document.createElement('div');
        accordionBody.classList.add("accordion-body");


        accordionCollapse.appendChild(accordionBody);

        // Lista de itens da categoria
        const itemList = document.createElement("ul");
        itemList.classList.add("list-group");

        categorias[categoria].forEach(valueIten => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");

            const divRowItem = document.createElement("div");
            divRowItem.classList.add("row");

            // Texto do item
            const colText = document.createElement("label");
            colText.classList.add("form-label");
            colText.innerText = `${valueIten.itemLabel}`;

            // Botões de Aprovação
            const colRadio = document.createElement("div");
            colRadio.classList.add("col-4");
            colRadio.innerHTML = `
                <input type="radio" class="btn-check" id="success-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="sim">
                <label class="btn btn-outline-success" for="success-${valueIten.item}">Aprovado</label>
                <input type="radio" class="btn-check" id="danger-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="nao">
                <label class="btn btn-outline-danger" for="danger-${valueIten.item}">Reprovado</label>
            `;
            divRowItem.appendChild(colRadio);

            // Botão de upload
            const colFile = document.createElement("div");
            colFile.classList.add("col-1");
            colFile.innerHTML = `
                <label for="file-${valueIten.item}" class="custom-file-label"><i class="fa-solid fa-paperclip"></i></label>
                <input type="file" id="file-${valueIten.item}" class="input-file">
            `;
            divRowItem.appendChild(colFile);

            // Campo de comentario
            const colObs = document.createElement("div");
            colObs.classList.add("col");
            colObs.innerHTML = `
                <label for="text-${valueIten.item}">obs: </label>
                <input type="textarea" id="text-${valueIten.item}">
            `;
            divRowItem.appendChild(colObs);

            li.appendChild(colText);
            li.appendChild(divRowItem);
            itemList.appendChild(li);
        });

        // Adiciona um evento de clique para expandir/recolher a categoria
        // header.addEventListener("click", () => {
        //     itemList.style.display = itemList.style.display === "none" ? "block" : "none";
        // });

        accordionCollapse.appendChild(itemList);
        categoryDiv.appendChild(accordionCollapse);
        formContainer.appendChild(categoryDiv);
    });
});