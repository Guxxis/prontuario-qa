<?php
header('Content-Type: application/json');
require __DIR__ . '/bigquery.php';

// Ativa logs detalhados
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');


try {

    // $json = file_get_contents('php://input');
    // $data = json_decode($json, true);

    // Verifica método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        exit(json_encode(['erro' => 'Método não permitido']));
    }

    // Obtém dados brutos e decodifica
    $json = file_get_contents('php://input');
    if (empty($json)) {
        throw new Exception('Payload JSON vazio');
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON inválido: ' . json_last_error_msg());
    }

    error_log('Dados recebidos: ' . print_r($data, true));


    // $dados = [
    //     'nome' => $data['dominio'] ?? '',
    //     'email' => $data['dominio'] ?? '',
    //     'mensagem' => $data['dominio'] ?? '',
    // ];

    $dados = [
        "id" => $data["id"],
        "dominio" => $data["dominio"],
        "op_tipo" => $data["op_tipo"],
        "id_cliente" => $data["id_cliente"],
        "id_ticket" => $data["id_ticket"],
        "analista_qa" => $data["analista_qa"],
        "data_validacao" => $data["data_validacao"],
        "analista_producao" => $data["analista_producao"],
        "data_producao" => $data["data_producao"],
        "pontuacao" => $data["pontuacao"],
        "porcentagem" => $data["porcentagem"],
        "pontuacao_maxima" => $data["pontuacao_maxima"],
        "status" => $data["status"],
        "core_web_vitals" => [
            "mobile_banner" => $data["core_web_vitals"]["mobile_banner"],
            "footer_lazy_load" => $data["core_web_vitals"]["footer_lazy_load"],
            "seo" => $data["core_web_vitals"]["seo"],
            "best_pratices" => $data["core_web_vitals"]["best_pratices"],
            "accessibility" => $data["core_web_vitals"]["accessibility"],
            "performance" => $data["core_web_vitals"]["performance"]
        ],
        "metadados_seo" => [
            "paginas_mpis" => $data["metadados_seo"]["paginas_mpis"],
            "mapa_site_links" => $data["metadados_seo"]["mapa_site_links"],
            "page_titles_multiple" => $data["metadados_seo"]["page_titles_multiple"],
            "coluna_lateral" => $data["metadados_seo"]["coluna_lateral"],
            "url_coerente_h1_pagina" => $data["metadados_seo"]["url_coerente_h1_pagina"],
            "menu_header_footer" => $data["metadados_seo"]["menu_header_footer"],
            "produtos_destaque" => $data["metadados_seo"]["produtos_destaque"],
            "empresa_segmento_h1_home" => $data["metadados_seo"]["empresa_segmento_h1_home"],
            "banners_link_mpis" => $data["metadados_seo"]["banners_link_mpis"],
            "meta_discriptions_duplicate" => $data["metadados_seo"]["meta_discriptions_duplicate"],
            "meta_discriptions_missing" => $data["metadados_seo"]["meta_discriptions_missing"],
            "page_titles_over_caracteres" => $data["metadados_seo"]["page_titles_over_caracteres"],
            "meta_discriptions_over_caracters" => $data["metadados_seo"]["meta_discriptions_over_caracters"],
            "page_titles_missing" => $data["metadados_seo"]["page_titles_missing"],
            "page_titles_duplicate" => $data["metadados_seo"]["page_titles_duplicate"],
            "links_externos" => $data["metadados_seo"]["links_externos"]
        ],
        "validacao_codigo" => [
            "sem_arquivos_old" => $data["validacao_codigo"]["sem_arquivos_old"],
            "font_awesome" => $data["validacao_codigo"]["font_awesome"],
            "w3c_html" => $data["validacao_codigo"]["w3c_html"],
            "w3c_css" => $data["validacao_codigo"]["w3c_css"],
            "lorem_ipsum_placeholder" => $data["validacao_codigo"]["lorem_ipsum_placeholder"]
        ],
        "estrutura_semantica" => [
            "h1_duplicate" => $data["estrutura_semantica"]["h1_duplicate"],
            "h1_multiple" => $data["estrutura_semantica"]["h1_multiple"],
            "h2_missing" => $data["estrutura_semantica"]["h2_missing"],
            "h1_missing" => $data["estrutura_semantica"]["h1_missing"]
        ],
        "fluxo" => [
            "pull_request" => $data["fluxo"]["pull_request"],
            "backup_bd" => $data["fluxo"]["backup_bd"]
        ],
        "urls" => [
            "urls_over_caracters" => $data["urls"]["urls_over_caracters"],
            "contains_space" => $data["urls"]["contains_space"],
            "multiple_slashes" => $data["urls"]["multiple_slashes"],
            "non_ascii_caracters" => $data["urls"]["non_ascii_caracters"],
            "uppercase" => $data["urls"]["uppercase"]
        ],
        "formulario" => [
            "recaptcha_formulario" => $data["formulario"]["recaptcha_formulario"],
            "mascara_formulario" => $data["formulario"]["mascara_formulario"]
        ],
        "imagens" => [
            "favicon" => $data["imagens"]["favicon"],
            "image_over" => $data["imagens"]["image_over"],
            "image_banner_over" => $data["imagens"]["image_banner_over"]
        ],
        "layout_usabilidade" => [
            "botao_voltar_topo" => $data["layout_usabilidade"]["botao_voltar_topo"],
            "mobile_elementos_desproporcionais" => $data["layout_usabilidade"]["mobile_elementos_desproporcionais"],
            "mobile_footer" => $data["layout_usabilidade"]["mobile_footer"],
            "mobile_menu_hamburguer" => $data["layout_usabilidade"]["mobile_menu_hamburguer"],
            "scroll_lateral" => $data["layout_usabilidade"]["scroll_lateral"],
            "mobile_mapa_google" => $data["layout_usabilidade"]["mobile_mapa_google"],
            "disproportionate_elementes" => $data["layout_usabilidade"]["disproportionate_elementes"],
            "broke_image_components" => $data["layout_usabilidade"]["broke_image_components"],
            "contraste_elementos" => $data["layout_usabilidade"]["contraste_elementos"],
            "botoes_clicaveis" => $data["layout_usabilidade"]["botoes_clicaveis"],
            "breadcrumbs" => $data["layout_usabilidade"]["breadcrumbs"],
            "active_menu" => $data["layout_usabilidade"]["active_menu"]
        ],
        "contato" => [
            "formatacao_endereco" => $data["contato"]["formatacao_endereco"],
            "formatacao_telefone" => $data["contato"]["formatacao_telefone"],
            "formatacao_email" => $data["contato"]["formatacao_email"],
            "email" => $data["contato"]["email"],
            "endereco" => $data["contato"]["endereco"],
            "telefone" => $data["contato"]["telefone"],
            "botao_cta_whatsapp" => $data["contato"]["botao_cta_whatsapp"],
            "faixa_cta" => $data["contato"]["faixa_cta"]
        ],
        "resposta_servidor" => [
            "response_code_server_error" => $data["resposta_servidor"]["response_code_server_error"],
            "response_code_client_error" => $data["resposta_servidor"]["response_code_client_error"],
            "response_code_success" => $data["resposta_servidor"]["response_code_success"],
            "response_code_redirection" => $data["resposta_servidor"]["response_code_redirection"]
        ],
        "seguranca" => [
            "security_missing_secure_referrer_policy" => $data["seguranca"]["security_missing_secure_referrer_policy"],
            "security_missing_x_frame_options" => $data["seguranca"]["security_missing_x_frame_options"],
            "security_missing_x_content_type_options" => $data["seguranca"]["security_missing_x_content_type_options"],
            "security_missing_content_security_policy" => $data["seguranca"]["security_missing_content_security_policy"],
            "popup_cookie" => $data["seguranca"]["popup_cookie"],
            "security_missing_hsts" => $data["seguranca"]["security_missing_hsts"],
            "security_mixed_content" => $data["seguranca"]["security_mixed_content"],
            "security_https_urls" => $data["seguranca"]["security_https_urls"]
        ],
        "publicacao" => [
            "spider" => $data["publicacao"]["spider"],
            "sensedata" => $data["publicacao"]["sensedata"],
            "searchconsole" => $data["publicacao"]["searchconsole"],
            "redirect_serp_404" => $data["publicacao"]["redirect_serp_404"],
            "analytics" => $data["publicacao"]["analytics"],
            "mpisistema" => $data["publicacao"]["mpisistema"],
            "redirect_www" => $data["publicacao"]["redirect_www"],
            "gitignore" => $data["publicacao"]["gitignore"]
        ]
    ];


    // Insere e aguarda resposta explícita
    $resultado = inserirNoBigQuery($dados);

    if ($resultado === true) {
        error_log('Inserção no BigQuery bem-sucedida');
        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Dados salvos com sucesso'
        ]);
        exit;
    }

    // Se chegou aqui, a inserção falhou
    error_log('Falha na inserção no BigQuery');
    http_response_code(500);
    echo json_encode([
        'erro' => 'Falha ao inserir no BigQuery',
        'detalhes' => 'A operação foi concluída mas não inseriu dados'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    // echo json_encode(['erro' => 'Falha ao inserir no BigQuery']);
    echo json_encode([
        'erro' => 'Exceção capturada',
        'mensagem' => $e->getMessage()
    ]);
}
