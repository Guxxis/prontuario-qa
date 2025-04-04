export function handleFiles(file) {
    return new Promise((resolve, reject) => {

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve(event.target.result);
            };
            reader.onerror = function (error) {
                reject(error);
            }
            reader.readAsDataURL(file);
        } else {
            reject("Apenas imagens são permitidas!");
        }
    });
}

export function handleAspectRatio (base64Image, maxWidth, maxHeight) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Image;
        img.onload = function () {
            let imgWidth = img.width;
            let imgHeight = img.height;

            // Calcular proporção
            const aspectRatio = imgWidth / imgHeight;

            // if (imgWidth > maxWidth) {
            //     imgWidth = maxWidth;
            //     imgHeight = imgWidth / aspectRatio;
            // }
            if (imgHeight > maxHeight) {
                imgHeight = maxHeight;
                imgWidth = imgHeight * aspectRatio;
            }

            resolve({
                "width": imgWidth,
                "height": imgHeight
            });
        };
    });
}
