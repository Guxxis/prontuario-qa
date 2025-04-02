export function validarFormulario() {
    let isValid = true;
    let mensagensErro = [];

    // Validar se campos obrigatórios estão preenchidos
    const validationList = document.querySelectorAll("[required]");

    validationList.forEach(campo => {
        if (!campo.value.trim()) {
            isValid = false;
            mensagensErro.push(`O campo ${campo.id} é obrigatório.`);
            campo.classList.add("erro"); // Adiciona classe de erro
        } else {
            campo.classList.remove("erro"); // Remove erro se estiver correto
        }
    });

    // Exibir mensagens de erro, se houver
    if (!isValid) {
        alert(mensagensErro.join("\n"));
    }

    return isValid;
}