export function handleFiles(file) {
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
