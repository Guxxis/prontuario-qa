import { DataManager } from "./data-manager.js";

export async function postData() {
    try {
        // 1. Carrega e valida os dados
        const savedData = DataManager.load();

        if (!savedData || savedData.length === 0) {
            throw new Error("Nenhum dado encontrado para enviar");
        }

        const formData = savedData[0];

        const payload = formatarParaBigQuery(formData);
        // 2. Adiciona metadados adicionais
        // const payload = {
        //     ...formData,
        //     metadata: {
        //         userAgent: navigator.userAgent,
        //         timestamp: new Date().toISOString(),
        //         screenResolution: `${window.screen.width}x${window.screen.height}`
        //     }
        // };

        console.log(payload);

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

function formatarParaBigQuery(dadosSession) {
    // Extrai os dados do sessionStorage
    const header = dadosSession; // Supondo que você armazenou o cabeçalho
    const itens = dadosSession.items;   // E os itens de validação
    const result = dadosSession.resultado;   // E os itens de validação

    // Estrutura conforme seu schema
    return {
        id: generateUniqueId(), // Função para gerar ID único
        dominio: header.dominio,
        op_tipo: header.opTipo,
        id_cliente: header.idCliente,
        id_ticket: header.idTicket || null,
        analista_qa: header.analistaQa,
        data_validacao: header.dataValidacao,
        analista_producao: header.analistaProducao || null,
        data_producao: header.dataProducao || null,
        pontuacao: result.pontuacao,
        porcentagem: result.porcentagem,
        pontuacao_maxima: result.pontuacaoMaxima,
        status: result.status,
        core_web_vitals: {
            performance: extrairPontuacao(itens, 'core_web_vitals', 'performance')
        },
        metadados_seo: {
            paginas_mpis: extrairPontuacao(itens, 'metadados_seo', 'paginas_mpis'),
            links_externos: extrairPontuacao(itens, 'metadados_seo', 'links_externos')
        },
        validacao_codigo: {
            sem_arquivos_old: extrairPontuacao(itens, 'validacao_codigo', 'sem_arquivos_old')
        }
    };
}

// Funções auxiliares
function extrairPontuacao(itens, categoria, subitem) {
    const item = itens.find(i => i.cat === categoria && i.item === subitem);
    return item?.approved; // Ou sua lógica de pontuação
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}