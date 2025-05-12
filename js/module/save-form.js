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
        id: generateUniqueId(),
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
            mobile_banner: extrairPontuacao(itens, 'core_web_vitals', 'mobile_banner'),
            footer_lazy_load: extrairPontuacao(itens, 'core_web_vitals', 'footer_lazy_load'),
            seo: extrairPontuacao(itens, 'core_web_vitals', 'seo'),
            best_pratices: extrairPontuacao(itens, 'core_web_vitals', 'best_pratices'),
            accessibility: extrairPontuacao(itens, 'core_web_vitals', 'accessibility'),
            performance: extrairPontuacao(itens, 'core_web_vitals', 'performance')
        },
        metadados_seo: {
            paginas_mpis: extrairPontuacao(itens, 'metadados_seo', 'paginas_mpis'),
            mapa_site_links: extrairPontuacao(itens, 'metadados_seo', 'mapa_site_links'),
            page_titles_multiple: extrairPontuacao(itens, 'metadados_seo', 'page_titles_multiple'),
            coluna_lateral: extrairPontuacao(itens, 'metadados_seo', 'coluna_lateral'),
            url_coerente_h1_pagina: extrairPontuacao(itens, 'metadados_seo', 'url_coerente_h1_pagina'),
            menu_header_footer: extrairPontuacao(itens, 'metadados_seo', 'menu_header_footer'),
            produtos_destaque: extrairPontuacao(itens, 'metadados_seo', 'produtos_destaque'),
            empresa_segmento_h1_home: extrairPontuacao(itens, 'metadados_seo', 'empresa_segmento_h1_home'),
            banners_link_mpis: extrairPontuacao(itens, 'metadados_seo', 'banners_link_mpis'),
            meta_discriptions_duplicate: extrairPontuacao(itens, 'metadados_seo', 'meta_discriptions_duplicate'),
            meta_discriptions_missing: extrairPontuacao(itens, 'metadados_seo', 'meta_discriptions_missing'),
            page_titles_over_caracteres: extrairPontuacao(itens, 'metadados_seo', 'page_titles_over_caracteres'),
            meta_discriptions_over_caracters: extrairPontuacao(itens, 'metadados_seo', 'meta_discriptions_over_caracters'),
            page_titles_missing: extrairPontuacao(itens, 'metadados_seo', 'page_titles_missing'),
            page_titles_duplicate: extrairPontuacao(itens, 'metadados_seo', 'page_titles_duplicate'),
            links_externos: extrairPontuacao(itens, 'metadados_seo', 'links_externos')
        },
        validacao_codigo: {
            sem_arquivos_old: extrairPontuacao(itens, 'validacao_codigo', 'sem_arquivos_old'),
            font_awesome: extrairPontuacao(itens, 'validacao_codigo', 'font_awesome'),
            w3c_html: extrairPontuacao(itens, 'validacao_codigo', 'w3c_html'),
            w3c_css: extrairPontuacao(itens, 'validacao_codigo', 'w3c_css'),
            lorem_ipsum_placeholder: extrairPontuacao(itens, 'validacao_codigo', 'lorem_ipsum_placeholder')
        },
        estrutura_semantica: {
            h1_duplicate: extrairPontuacao(itens, 'estrutura_semantica', 'h1_duplicate'),
            h1_multiple: extrairPontuacao(itens, 'estrutura_semantica', 'h1_multiple'),
            h2_missing: extrairPontuacao(itens, 'estrutura_semantica', 'h2_missing'),
            h1_missing: extrairPontuacao(itens, 'estrutura_semantica', 'h1_missing')
        },
        fluxo: {
            pull_request: extrairPontuacao(itens, 'fluxo', 'pull_request'),
            backup_bd: extrairPontuacao(itens, 'fluxo', 'backup_bd')
        },
        urls: {
            urls_over_caracters: extrairPontuacao(itens, 'urls', 'urls_over_caracters'),
            contains_space: extrairPontuacao(itens, 'urls', 'contains_space'),
            multiple_slashes: extrairPontuacao(itens, 'urls', 'multiple_slashes'),
            non_ascii_caracters: extrairPontuacao(itens, 'urls', 'non_ascii_caracters'),
            uppercase: extrairPontuacao(itens, 'urls', 'uppercase')
        },
        formulario: {
            recaptcha_formulario: extrairPontuacao(itens, 'formulario', 'recaptcha_formulario'),
            mascara_formulario: extrairPontuacao(itens, 'formulario', 'mascara_formulario')
        },
        imagens: {
            favicon: extrairPontuacao(itens, 'imagens', 'favicon'),
            image_over: extrairPontuacao(itens, 'imagens', 'image_over'),
            image_banner_over: extrairPontuacao(itens, 'imagens', 'image_banner_over')
        },
        layout_usabilidade: {
            botao_voltar_topo: extrairPontuacao(itens, 'layout_usabilidade', 'botao_voltar_topo'),
            mobile_elementos_desproporcionais: extrairPontuacao(itens, 'layout_usabilidade', 'mobile_elementos_desproporcionais'),
            mobile_footer: extrairPontuacao(itens, 'layout_usabilidade', 'mobile_footer'),
            mobile_menu_hamburguer: extrairPontuacao(itens, 'layout_usabilidade', 'mobile_menu_hamburguer'),
            scroll_lateral: extrairPontuacao(itens, 'layout_usabilidade', 'scroll_lateral'),
            mobile_mapa_google: extrairPontuacao(itens, 'layout_usabilidade', 'mobile_mapa_google'),
            disproportionate_elementes: extrairPontuacao(itens, 'layout_usabilidade', 'disproportionate_elementes'),
            broke_image_components: extrairPontuacao(itens, 'layout_usabilidade', 'broke_image_components'),
            contraste_elementos: extrairPontuacao(itens, 'layout_usabilidade', 'contraste_elementos'),
            botoes_clicaveis: extrairPontuacao(itens, 'layout_usabilidade', 'botoes_clicaveis'),
            breadcrumbs: extrairPontuacao(itens, 'layout_usabilidade', 'breadcrumbs'),
            active_menu: extrairPontuacao(itens, 'layout_usabilidade', 'active_menu')
        },
        contato: {
            formatacao_endereco: extrairPontuacao(itens, 'contato', 'formatacao_endereco'),
            formatacao_telefone: extrairPontuacao(itens, 'contato', 'formatacao_telefone'),
            formatacao_email: extrairPontuacao(itens, 'contato', 'formatacao_email'),
            email: extrairPontuacao(itens, 'contato', 'email'),
            endereco: extrairPontuacao(itens, 'contato', 'endereco'),
            telefone: extrairPontuacao(itens, 'contato', 'telefone'),
            botao_cta_whatsapp: extrairPontuacao(itens, 'contato', 'botao_cta_whatsapp'),
            faixa_cta: extrairPontuacao(itens, 'contato', 'faixa_cta')
        },
        resposta_servidor: {
            response_code_server_error: extrairPontuacao(itens, 'resposta_servidor', 'response_code_server_error'),
            response_code_client_error: extrairPontuacao(itens, 'resposta_servidor', 'response_code_client_error'),
            response_code_success: extrairPontuacao(itens, 'resposta_servidor', 'response_code_success'),
            response_code_redirection: extrairPontuacao(itens, 'resposta_servidor', 'response_code_redirection')
        },
        seguranca: {
            security_missing_secure_referrer_policy: extrairPontuacao(itens, 'seguranca', 'security_missing_secure_referrer_policy'),
            security_missing_x_frame_options: extrairPontuacao(itens, 'seguranca', 'security_missing_x_frame_options'),
            security_missing_x_content_type_options: extrairPontuacao(itens, 'seguranca', 'security_missing_x_content_type_options'),
            security_missing_content_security_policy: extrairPontuacao(itens, 'seguranca', 'security_missing_content_security_policy'),
            popup_cookie: extrairPontuacao(itens, 'seguranca', 'popup_cookie'),
            security_missing_hsts: extrairPontuacao(itens, 'seguranca', 'security_missing_hsts'),
            security_mixed_content: extrairPontuacao(itens, 'seguranca', 'security_mixed_content'),
            security_https_urls: extrairPontuacao(itens, 'seguranca', 'security_https_urls')
        },
        publicacao: {
            spider: extrairPontuacao(itens, 'publicacao', 'spider'),
            sensedata: extrairPontuacao(itens, 'publicacao', 'sensedata'),
            searchconsole: extrairPontuacao(itens, 'publicacao', 'searchconsole'),
            redirect_serp_404: extrairPontuacao(itens, 'publicacao', 'redirect_serp_404'),
            analytics: extrairPontuacao(itens, 'publicacao', 'analytics'),
            mpisistema: extrairPontuacao(itens, 'publicacao', 'mpisistema'),
            redirect_www: extrairPontuacao(itens, 'publicacao', 'redirect_www'),
            gitignore: extrairPontuacao(itens, 'publicacao', 'gitignore')
        },
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