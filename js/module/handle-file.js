export function handleFiles(file) {
    return new Promise((resolve, reject) => {

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (event) {
                resolve(event.target.result);
            };
            reader.onerror = function (error) {
                reject(error);
            }
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

export function compressImage(base64, quality = 1) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 100; // Largura máxima (ajuste conforme necessário)
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality)); // Converte para JPEG com qualidade reduzida
      };
    });
  }