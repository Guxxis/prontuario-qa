// Gerenciador central de dados  
export const DataManager = {  
    // Carrega dados do sessionStorage  
    load() {  
      const savedData = sessionStorage.getItem('prontuarioValidacao');  
      return savedData ? JSON.parse(savedData) : [];  
    },  
  
    // Salva dados no sessionStorage  
    save(data) {  
      try {  
        sessionStorage.setItem('prontuarioQA', JSON.stringify(data));  
        console.log("Dados salvos:", data);  
      } catch (error) {  
        console.error("Erro ao salvar:", error);  
        // Aqui você pode chamar a função de compressão de imagens  
      }  
    },  
  
    // Atualiza um item específico  
    updateItem(itemId, newData) {  
      const itens = this.load();  
      const itemIndex = itens.findIndex(item => item.id === itemId);  
  
      if (itemIndex >= 0) {  
        itens[itemIndex] = { ...itens[itemIndex], ...newData };  
        this.save(itens);  
      }  
    },  
  
    // Adiciona uma imagem a um item  
    addImage(itemId, image) {  
      const itens = this.load();  
      const itemIndex = itens.findIndex(item => item.id === itemId);  
  
      if (itemIndex >= 0) {  
        if (!itens[itemIndex].imagens) itens[itemIndex].imagens = [];  
        itens[itemIndex].imagens.push(image);  
        this.save(itens);  
      }  
    }  
  };  