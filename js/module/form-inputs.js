function groupBy(items, key) {
    return items.reduce((acc, item) => {
        const group = item[key];
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {});
}

export function construcInputForm(jsonItens, orderBy) {
    const formContainer = document.getElementById("form-container");

    let category = '';
    let subCategory = '';

    switch (orderBy) {
        case "cat":
            category = 'catLabel';
            subCategory = 'toolLabel';
            break;
        case "tool":
            category = 'toolLabel';
            subCategory = 'catLabel';
            break;
        default:
            console.log("Opção de organização não aceita!");

    }



    const categorias = groupBy(jsonItens, orderBy);

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
                    ${categorias[categoria][0][category]}
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

            const divRowText = document.createElement("div");
            divRowText.classList.add("row");

            //Tooltip
            const tooltipContainer = document.createElement("div");
            tooltipContainer.classList.add("col-1")
            tooltipContainer.innerHTML = `
                <span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="${valueIten.info}">
                    <button class="custom-button-tooltip" type="button" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>
                    </button>
                </span>
            `

            divRowText.appendChild(tooltipContainer);

            // Texto do item
            const textContainer = document.createElement("div");
            textContainer.classList.add("col")

            const textLabel = document.createElement("label");
            textLabel.classList.add("form-label");
            textLabel.innerText = `${valueIten[subCategory]} > ${valueIten.itemLabel}`;

            textContainer.appendChild(textLabel);
            divRowText.appendChild(textContainer);

            const divRowRadio = document.createElement("div");
            divRowRadio.classList.add("row");

            // Botões de Aprovação
            const radioContainer = document.createElement("div");
            radioContainer.classList.add("col-4");
            radioContainer.innerHTML = `
                <input type="radio" class="btn-check" id="success-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="sim" required>
                <label class="btn btn-outline-success" for="success-${valueIten.item}">Aprovado</label>
                <input type="radio" class="btn-check" id="danger-${valueIten.item}" name="${valueIten.cat};${valueIten.item}" value="nao" required>
                <label class="btn btn-outline-danger" for="danger-${valueIten.item}">Reprovado</label>
            `;
            divRowRadio.appendChild(radioContainer);


            // Campo de comentario
            const commentContainer = document.createElement("div");
            commentContainer.classList.add("col-8");
            commentContainer.style.display = "none";
            commentContainer.id = (`text-container-${valueIten.item}`);
            commentContainer.innerHTML = `
                <input type="text" id="text-${valueIten.item}" name="text-container-${valueIten.item}" class="form-control"placeholder="Observações...">
            `;
            // commentContainer.innerHTML = `
            //     <textarea id="text-${valueIten.item}" class="form-control" rows="1" cols="50" placeholder="Observações..."></textarea>
            // `;
            divRowRadio.appendChild(commentContainer);

            const divRowAttach = document.createElement("div");
            divRowAttach.classList.add("row");

            // Area Drag and Drop
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("col-12");
            imageContainer.classList.add("drop-area");
            imageContainer.style.display = "none";
            imageContainer.id = (`image-container-${valueIten.item}`);

            imageContainer.addEventListener("click", () => {
                activeField = `image-container-${valueIten.item}`;
            });

            const imageAttach = document.createElement("input");
            imageAttach.type = "file";
            imageAttach.style.display = "none";

            const imagePreview = document.createElement("div");
            imagePreview.classList.add("preview-area")
            imagePreview.id = (`image-preview-${valueIten.item}`);


            imageContainer.appendChild(imageAttach);
            imageContainer.appendChild(imagePreview);
            divRowAttach.appendChild(imageContainer);


            //
            li.appendChild(divRowText);
            li.appendChild(divRowRadio);
            li.appendChild(divRowAttach);
            itemList.appendChild(li);
        });

        accordionCollapse.appendChild(itemList);
        categoryDiv.appendChild(accordionCollapse);
        formContainer.appendChild(categoryDiv);
    });
}