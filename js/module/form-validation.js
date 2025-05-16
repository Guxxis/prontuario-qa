export function formValidation(event) {
    let formOk = true;

    const forms = document.querySelectorAll('.needs-validation');
    
    const progresBar = document.querySelector('#barraProgresso');
    const progressFeedback = document.querySelector('#progress-container .invalid-feedback');
    const progressNow = progresBar.getAttribute("aria-valuenow");
    const progressMax = progresBar.getAttribute("aria-valuemax");

    Array.from(forms).forEach(form => {
        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            progressFeedback.style.display = progressNow > progressMax ? 'block':'none';
            formOk = false;
        } else {
            progressFeedback.style.display = 'none';
            formOk = true;
        }
    })

    return formOk;
}