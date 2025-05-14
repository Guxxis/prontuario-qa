// Gerenciador central de dados  
export const DataManager = {
  // Carrega dados do sessionStorage  
  load() {
    const savedData = sessionStorage.getItem('prontuarioValidacao');
    return savedData ? JSON.parse(savedData) : null;
  },

  drop() {
    sessionStorage.removeItem('prontuarioValidacao');
  },

  // Salva dados no sessionStorage  
  save(data) {
    try {
      sessionStorage.setItem('prontuarioValidacao', JSON.stringify(data));
      // console.log("Dados salvos:", data);
    } catch (error) {
      // console.error("Erro ao salvar:", error);
      // Aqui você pode chamar a função de compressão de imagens  
    }
  },

  // Atualiza um item específico  
  updateItem(itemId, campo, valor) {
    const dados = JSON.parse(sessionStorage.getItem('prontuarioValidacao'));
    const itemIndex = dados[0].items.findIndex(item => item.item === itemId);
    if (itemIndex >= 0) {
      dados[0].items[itemIndex][campo] = valor;
      sessionStorage.setItem('prontuarioValidacao', JSON.stringify(dados));
    }
  },

  // Atualiza o cabeçalho
  updateHeader(campo, valor) {
    const dados = JSON.parse(sessionStorage.getItem('prontuarioValidacao'));
    dados[0][campo] = valor;
    sessionStorage.setItem('prontuarioValidacao', JSON.stringify(dados));

  },

  // Adiciona uma imagem a um item  
  addImage(itemId, image) {
    const dados = JSON.parse(sessionStorage.getItem('prontuarioValidacao'));
    const itemIndex = dados[0].items.findIndex(item => item.item === itemId);

    if (itemIndex >= 0) {
      if (dados[0].items[itemIndex].images.length >= 3) {
        alert(`Limite de imagens por item atingido`);
      } else {
        dados[0].items[itemIndex].images.push(image);
        sessionStorage.setItem('prontuarioValidacao', JSON.stringify(dados));
      }
    }
  }
};  