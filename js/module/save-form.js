import { DataManager } from "./data-manager.js";

export async function postData() {
    try {
        // 1. Carrega e valida os dados
        const savedData = DataManager.load();
        
        if (!savedData || savedData.length === 0) {
            throw new Error("Nenhum dado encontrado para enviar");
        }

        const formData = savedData[0];
        
        // 2. Adiciona metadados adicionais
        const payload = {
            ...formData,
            metadata: {
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                screenResolution: `${window.screen.width}x${window.screen.height}`
            }
        };



        // 4. Faz a requisição
        const response = await fetch('api/salvar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(payload)
        });

        // 5. Processa a resposta
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || 'Erro no servidor');
        }

        // 7. Limpeza opcional após sucesso
        // DataManager.clear();
        
        return data;

    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        throw error; // Propaga o erro para tratamento adicional se necessário
    }
}