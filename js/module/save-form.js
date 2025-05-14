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

        // console.log(payload);

        // 4. Faz a requisição
        // const response = await fetch('api/salvar.php', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-Requested-With': 'XMLHttpRequest'
        //     },
        //     body: JSON.stringify(payload)
        // });

        // // 5. Processa a resposta
        // const data = await response.json();

        // if (!response.ok) {
        //     throw new Error(data.mensagem || 'Erro no servidor');
        // } else {
        //     DataManager.drop();
        //     alert('Enviado com sucesso!');
        // }

        fetch('api/salvar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                if (data.sucesso) {
                    DataManager.drop();
                    alert('Enviado com sucesso!');
                } else {
                    alert('Erro ao enviar!');
                }
            })
            .catch(error => {
                console.error("erro ao encaminhar dados: ", error)
            });

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
            accessibility: extrairPontuacao(itens, 'core_web_vitals', 'accessibility'),
            best_pratices: extrairPontuacao(itens, 'core_web_vitals', 'best_pratices'),
            performance: extrairPontuacao(itens, 'core_web_vitals', 'performance'),
            seo: extrairPontuacao(itens, 'core_web_vitals', 'seo'),
            footer_lazy_load: extrairPontuacao(itens, 'core_web_vitals', 'footer_lazy_load'),
            smartphone_banner: extrairPontuacao(itens, 'core_web_vitals', 'smartphone_banner')
        },
        metadados_seo: {
            banners_link_mpis: extrairPontuacao(itens, 'metadados_seo', 'banners_link_mpis'),
            breadcrumbs: extrairPontuacao(itens, 'metadados_seo', 'breadcrumbs'),
            enterprise_name_h1_home: extrairPontuacao(itens, 'metadados_seo', 'enterprise_name_h1_home'),
            featured_products: extrairPontuacao(itens, 'metadados_seo', 'featured_products'),
            menu_header_footer: extrairPontuacao(itens, 'metadados_seo', 'menu_header_footer'),
            mpis_pages: extrairPontuacao(itens, 'metadados_seo', 'mpis_pages'),
            side_column: extrairPontuacao(itens, 'metadados_seo', 'side_column'),
            sitemap_links: extrairPontuacao(itens, 'metadados_seo', 'sitemap_links'),
            url_match_h1_page: extrairPontuacao(itens, 'metadados_seo', 'url_match_h1_page'),
            links_internal_nofollow: extrairPontuacao(itens, 'metadados_seo', 'links_internal_nofollow'),
            meta_discriptions_duplicate: extrairPontuacao(itens, 'metadados_seo', 'meta_discriptions_duplicate'),
            meta_discriptions_missing: extrairPontuacao(itens, 'metadados_seo', 'meta_discriptions_missing'),
            meta_discriptions_over_caracters: extrairPontuacao(itens, 'metadados_seo', 'meta_discriptions_over_caracters'),
            page_titles_duplicate: extrairPontuacao(itens, 'metadados_seo', 'page_titles_duplicate'),
            page_titles_missing: extrairPontuacao(itens, 'metadados_seo', 'page_titles_missing'),
            page_titles_multiple: extrairPontuacao(itens, 'metadados_seo', 'page_titles_multiple'),
            page_titles_over_caracteres: extrairPontuacao(itens, 'metadados_seo', 'page_titles_over_caracteres')
        },
        validacao_codigo: {
            backup_bd: extrairPontuacao(itens, 'validacao_codigo', 'backup_bd'),
            buttons_clickable: extrairPontuacao(itens, 'validacao_codigo', 'buttons_clickable'),
            config_gitignore: extrairPontuacao(itens, 'validacao_codigo', 'config_gitignore'),
            old_archives: extrairPontuacao(itens, 'validacao_codigo', 'old_archives'),
            popup_cookie: extrairPontuacao(itens, 'validacao_codigo', 'popup_cookie'),
            content_lorem_ipsum_placeholder: extrairPontuacao(itens, 'validacao_codigo', 'content_lorem_ipsum_placeholder'),
            font_awesome: extrairPontuacao(itens, 'validacao_codigo', 'font_awesome'),
            w3c_css: extrairPontuacao(itens, 'validacao_codigo', 'w3c_css'),
            w3c_html: extrairPontuacao(itens, 'validacao_codigo', 'w3c_html')
        },
        estrutura_semantica: {
            h1_duplicate: extrairPontuacao(itens, 'estrutura_semantica', 'h1_duplicate'),
            h1_missing: extrairPontuacao(itens, 'estrutura_semantica', 'h1_missing'),
            h1_multiple: extrairPontuacao(itens, 'estrutura_semantica', 'h1_multiple'),
            h2_missing: extrairPontuacao(itens, 'estrutura_semantica', 'h2_missing')
        },
        urls: {
            redirect_serp_404: extrairPontuacao(itens, 'urls', 'redirect_serp_404'),
            redirect_www: extrairPontuacao(itens, 'urls', 'redirect_www'),
            urls_contains_space: extrairPontuacao(itens, 'urls', 'urls_contains_space'),
            urls_multiple_slashes: extrairPontuacao(itens, 'urls', 'urls_multiple_slashes'),
            urls_non_ascii_caracters: extrairPontuacao(itens, 'urls', 'urls_non_ascii_caracters'),
            urls_over_caracters: extrairPontuacao(itens, 'urls', 'urls_over_caracters'),
            urls_uppercase: extrairPontuacao(itens, 'urls', 'urls_uppercase')
        },
        contato: {
            cta_container: extrairPontuacao(itens, 'contato', 'cta_container'),
            cta_whatsapp: extrairPontuacao(itens, 'contato', 'cta_whatsapp'),
            formatting_address: extrairPontuacao(itens, 'contato', 'formatting_address'),
            formatting_fone: extrairPontuacao(itens, 'contato', 'formatting_fone'),
            formatting_mail: extrairPontuacao(itens, 'contato', 'formatting_mail'),
            text_address: extrairPontuacao(itens, 'contato', 'text_address'),
            text_fone: extrairPontuacao(itens, 'contato', 'text_fone'),
            text_mail: extrairPontuacao(itens, 'contato', 'text_mail')
        },
        formulario: {
            form_leads: extrairPontuacao(itens, 'formulario', 'form_leads'),
            form_mask: extrairPontuacao(itens, 'formulario', 'form_mask'),
            form_recaptcha: extrairPontuacao(itens, 'formulario', 'form_recaptcha')
        },
        imagens: {
            image_broke: extrairPontuacao(itens, 'imagens', 'image_broke'),
            image_favicon: extrairPontuacao(itens, 'imagens', 'image_favicon'),
            image_banner_over: extrairPontuacao(itens, 'imagens', 'image_banner_over'),
            image_over: extrairPontuacao(itens, 'imagens', 'image_over')
        },
        layout_usabilidade: {
            buttons_active_menu: extrairPontuacao(itens, 'layout_usabilidade', 'buttons_active_menu'),
            buttons_back_top: extrairPontuacao(itens, 'layout_usabilidade', 'buttons_back_top'),
            desktop_disproportionate_elements: extrairPontuacao(itens, 'layout_usabilidade', 'desktop_disproportionate_elements'),
            elements_contrast: extrairPontuacao(itens, 'layout_usabilidade', 'elements_contrast'),
            horizontal_scroll: extrairPontuacao(itens, 'layout_usabilidade', 'horizontal_scroll'),
            smartphone_disproportionate_elements: extrairPontuacao(itens, 'layout_usabilidade', 'smartphone_disproportionate_elements'),
            smartphone_footer: extrairPontuacao(itens, 'layout_usabilidade', 'smartphone_footer'),
            smartphone_google_map: extrairPontuacao(itens, 'layout_usabilidade', 'smartphone_google_map'),
            smartphone_mobile_menu: extrairPontuacao(itens, 'layout_usabilidade', 'smartphone_mobile_menu'),
            tablet_disproportionate_elements: extrairPontuacao(itens, 'layout_usabilidade', 'tablet_disproportionate_elements'),
            tablet_footer: extrairPontuacao(itens, 'layout_usabilidade', 'tablet_footer'),
            tablet_google_map: extrairPontuacao(itens, 'layout_usabilidade', 'tablet_google_map'),
            tablet_mobile_menu: extrairPontuacao(itens, 'layout_usabilidade', 'tablet_mobile_menu')
        },
        resposta_servidor: {
            response_code_client_error: extrairPontuacao(itens, 'resposta_servidor', 'response_code_client_error'),
            response_code_redirection: extrairPontuacao(itens, 'resposta_servidor', 'response_code_redirection'),
            response_code_server_error: extrairPontuacao(itens, 'resposta_servidor', 'response_code_server_error'),
            response_code_success: extrairPontuacao(itens, 'resposta_servidor', 'response_code_success')
        },
        seguranca: {
            security_https_urls: extrairPontuacao(itens, 'seguranca', 'security_https_urls'),
            security_missing_content_security_policy: extrairPontuacao(itens, 'seguranca', 'security_missing_content_security_policy'),
            security_missing_hsts: extrairPontuacao(itens, 'seguranca', 'security_missing_hsts'),
            security_missing_secure_referrer_policy: extrairPontuacao(itens, 'seguranca', 'security_missing_secure_referrer_policy'),
            security_missing_x_content_type_options: extrairPontuacao(itens, 'seguranca', 'security_missing_x_content_type_options'),
            security_missing_x_frame_options: extrairPontuacao(itens, 'seguranca', 'security_missing_x_frame_options'),
            security_mixed_content: extrairPontuacao(itens, 'seguranca', 'security_mixed_content')
        },
        publicacao: {
            config_analytics: extrairPontuacao(itens, 'publicacao', 'config_analytics'),
            config_crm: extrairPontuacao(itens, 'publicacao', 'config_crm'),
            config_mpisistema: extrairPontuacao(itens, 'publicacao', 'config_mpisistema'),
            config_searchconsole: extrairPontuacao(itens, 'publicacao', 'config_searchconsole'),
            config_spider: extrairPontuacao(itens, 'publicacao', 'config_spider')
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