
// function gerarPDF() {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     let y = 10;
//     doc.setFontSize(14);
//     doc.text("Prontuário de Validação", 10, y);
//     y += 10;

//     const campos = document.querySelectorAll("input, select, textarea");
//     let promises = [];

//     campos.forEach(campo => {
//         if (campo.type === "checkbox" && !campo.checked) return;

//         if (campo.type === "file" && campo.files.length > 0) {
//             const file = campo.files[0];
//             const reader = new FileReader();

//             let promise = new Promise((resolve) => {
//                 reader.onload = function (e) {
//                     let imgData = e.target.result;
//                     doc.setFontSize(10);
//                     doc.text(`${campo.dataset.label}:`, 10, y);
//                     y += 5;

//                     doc.addImage(imgData, "JPEG", 10, y, 50, 30); // Ajuste de tamanho da imagem
//                     y += 35;

//                     if (y > 280) {
//                         doc.addPage();
//                         y = 10;
//                     }
//                     resolve();
//                 };
//                 reader.readAsDataURL(file);
//             });

//             promises.push(promise);
//         } else {
//             let valor = campo.value;
//             doc.setFontSize(10);
//             doc.text(`${campo.dataset.label}: ${valor}`, 10, y);
//             y += 7;

//             if (y > 280) {
//                 doc.addPage();
//                 y = 10;
//             }
//         }
//     });

//     Promise.all(promises).then(() => {
//         doc.save("prontuario.pdf");
//     });
// }

// function toggleCampo(selectId, divId) {
//     document.getElementById(divId).style.display =
//         document.getElementById(selectId).value === "Sim" ? "block" : "none";
// }

// function toggleCampoComLinks(selectId, divId) {
//     document.getElementById(divId).style.display =
//         document.getElementById(selectId).value === "Sim" ? "block" : "none";
// }

// function adicionarCampo(divId, label) {
//     const div = document.createElement("div");
//     div.innerHTML = `<label>${label}: <input type="text" data-label="${label}"></label><br>`;
//     document.getElementById(divId).appendChild(div);
// }

// let contadorSugestoes = 1;

// function toggleMelhoriasLayout() {
//     document.getElementById("melhoriasLayoutCampos").style.display =
//         document.getElementById("melhoriasLayout").value === "Sim" ? "block" : "none";
// }

// function adicionarSugestao() {
//     contadorSugestoes++;
//     let div = document.createElement("div");
//     div.innerHTML = `
//         <label>Upload de Imagem ${contadorSugestoes}: <input type="file" data-label="Imagem de Melhoria ${contadorSugestoes}"></label><br>
//         <label>Sugestão ${contadorSugestoes}: <input type="text" data-label="Sugestão de Melhoria ${contadorSugestoes}"></label><br>
//     `;
//     document.getElementById("maisSugestoes").appendChild(div);
// }