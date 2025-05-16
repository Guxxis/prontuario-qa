<?php
header('Content-Type: application/json');
require __DIR__ . '/bigquery.php';

// Ativa logs detalhados
// ini_set('display_errors', 0);
// ini_set('log_errors', 1);
// ini_set('error_log', __DIR__ . '/php_errors.log');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        exit(json_encode(['erro' => 'Método não permitido']));
    }

    $json = file_get_contents('php://input');
    if (empty($json)) {
        throw new Exception('Payload JSON vazio');
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON inválido: ' . json_last_error_msg());
    }

    error_log('Dados recebidos: ' . print_r($data, true));

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
            "accessibility" => $data["core_web_vitals"]["accessibility"],
            "best_pratices" => $data["core_web_vitals"]["best_pratices"],
            "performance" => $data["core_web_vitals"]["performance"],
            "seo" => $data["core_web_vitals"]["seo"],
            "footer_lazy_load" => $data["core_web_vitals"]["footer_lazy_load"],
            "smartphone_banner" => $data["core_web_vitals"]["smartphone_banner"]
        ],
        "metadados_seo" => [
            "banners_link_mpis" => $data["metadados_seo"]["banners_link_mpis"],
            "breadcrumbs" => $data["metadados_seo"]["breadcrumbs"],
            "enterprise_name_h1_home" => $data["metadados_seo"]["enterprise_name_h1_home"],
            "featured_products" => $data["metadados_seo"]["featured_products"],
            "menu_header_footer" => $data["metadados_seo"]["menu_header_footer"],
            "mpis_pages" => $data["metadados_seo"]["mpis_pages"],
            "side_column" => $data["metadados_seo"]["side_column"],
            "sitemap_links" => $data["metadados_seo"]["sitemap_links"],
            "url_match_h1_page" => $data["metadados_seo"]["url_match_h1_page"],
            "links_internal_nofollow" => $data["metadados_seo"]["links_internal_nofollow"],
            "meta_discriptions_duplicate" => $data["metadados_seo"]["meta_discriptions_duplicate"],
            "meta_discriptions_missing" => $data["metadados_seo"]["meta_discriptions_missing"],
            "meta_discriptions_over_caracters" => $data["metadados_seo"]["meta_discriptions_over_caracters"],
            "page_titles_duplicate" => $data["metadados_seo"]["page_titles_duplicate"],
            "page_titles_missing" => $data["metadados_seo"]["page_titles_missing"],
            "page_titles_multiple" => $data["metadados_seo"]["page_titles_multiple"],
            "page_titles_over_caracteres" => $data["metadados_seo"]["page_titles_over_caracteres"]
        ],
        "validacao_codigo" => [
            "backup_bd" => $data["validacao_codigo"]["backup_bd"],
            "buttons_clickable" => $data["validacao_codigo"]["buttons_clickable"],
            "config_gitignore" => $data["validacao_codigo"]["config_gitignore"],
            "old_archives" => $data["validacao_codigo"]["old_archives"],
            "popup_cookie" => $data["validacao_codigo"]["popup_cookie"],
            "content_lorem_ipsum_placeholder" => $data["validacao_codigo"]["content_lorem_ipsum_placeholder"],
            "font_awesome" => $data["validacao_codigo"]["font_awesome"],
            "w3c_css" => $data["validacao_codigo"]["w3c_css"],
            "w3c_html" => $data["validacao_codigo"]["w3c_html"]
        ],
        "estrutura_semantica" => [
            "h1_duplicate" => $data["estrutura_semantica"]["h1_duplicate"],
            "h1_missing" => $data["estrutura_semantica"]["h1_missing"],
            "h1_multiple" => $data["estrutura_semantica"]["h1_multiple"],
            "h2_missing" => $data["estrutura_semantica"]["h2_missing"]
        ],
        "urls" => [
            "redirect_serp_404" => $data["urls"]["redirect_serp_404"],
            "redirect_www" => $data["urls"]["redirect_www"],
            "urls_contains_space" => $data["urls"]["urls_contains_space"],
            "urls_multiple_slashes" => $data["urls"]["urls_multiple_slashes"],
            "urls_non_ascii_caracters" => $data["urls"]["urls_non_ascii_caracters"],
            "urls_over_caracters" => $data["urls"]["urls_over_caracters"],
            "urls_uppercase" => $data["urls"]["urls_uppercase"]
        ],
        "contato" => [
            "cta_container" => $data["contato"]["cta_container"],
            "cta_whatsapp" => $data["contato"]["cta_whatsapp"],
            "formatting_address" => $data["contato"]["formatting_address"],
            "formatting_fone" => $data["contato"]["formatting_fone"],
            "formatting_mail" => $data["contato"]["formatting_mail"],
            "text_address" => $data["contato"]["text_address"],
            "text_fone" => $data["contato"]["text_fone"],
            "text_mail" => $data["contato"]["text_mail"]
        ],
        "formulario" => [
            "form_leads" => $data["formulario"]["form_leads"],
            "form_mask" => $data["formulario"]["form_mask"],
            "form_recaptcha" => $data["formulario"]["form_recaptcha"]
        ],
        "imagens" => [
            "image_broke" => $data["imagens"]["image_broke"],
            "image_favicon" => $data["imagens"]["image_favicon"],
            "image_banner_over" => $data["imagens"]["image_banner_over"],
            "image_over" => $data["imagens"]["image_over"]
        ],
        "layout_usabilidade" => [
            "buttons_active_menu" => $data["layout_usabilidade"]["buttons_active_menu"],
            "buttons_back_top" => $data["layout_usabilidade"]["buttons_back_top"],
            "desktop_disproportionate_elements" => $data["layout_usabilidade"]["desktop_disproportionate_elements"],
            "elements_contrast" => $data["layout_usabilidade"]["elements_contrast"],
            "horizontal_scroll" => $data["layout_usabilidade"]["horizontal_scroll"],
            "smartphone_disproportionate_elements" => $data["layout_usabilidade"]["smartphone_disproportionate_elements"],
            "smartphone_footer" => $data["layout_usabilidade"]["smartphone_footer"],
            "smartphone_google_map" => $data["layout_usabilidade"]["smartphone_google_map"],
            "smartphone_mobile_menu" => $data["layout_usabilidade"]["smartphone_mobile_menu"],
            "tablet_disproportionate_elements" => $data["layout_usabilidade"]["tablet_disproportionate_elements"],
            "tablet_footer" => $data["layout_usabilidade"]["tablet_footer"],
            "tablet_google_map" => $data["layout_usabilidade"]["tablet_google_map"],
            "tablet_mobile_menu" => $data["layout_usabilidade"]["tablet_mobile_menu"]
        ],
        "resposta_servidor" => [
            "response_code_client_error" => $data["resposta_servidor"]["response_code_client_error"],
            "response_code_redirection" => $data["resposta_servidor"]["response_code_redirection"],
            "response_code_server_error" => $data["resposta_servidor"]["response_code_server_error"],
            "response_code_success" => $data["resposta_servidor"]["response_code_success"]
        ],
        "seguranca" => [
            "security_https_urls" => $data["seguranca"]["security_https_urls"],
            "security_missing_content_security_policy" => $data["seguranca"]["security_missing_content_security_policy"],
            "security_missing_hsts" => $data["seguranca"]["security_missing_hsts"],
            "security_missing_secure_referrer_policy" => $data["seguranca"]["security_missing_secure_referrer_policy"],
            "security_missing_x_content_type_options" => $data["seguranca"]["security_missing_x_content_type_options"],
            "security_missing_x_frame_options" => $data["seguranca"]["security_missing_x_frame_options"],
            "security_mixed_content" => $data["seguranca"]["security_mixed_content"]
        ],
        "publicacao" => [
            "config_analytics" => $data["publicacao"]["config_analytics"],
            "config_crm" => $data["publicacao"]["config_crm"],
            "config_mpisistema" => $data["publicacao"]["config_mpisistema"],
            "config_searchconsole" => $data["publicacao"]["config_searchconsole"],
            "config_spider" => $data["publicacao"]["config_spider"]
        ]
    ];

    $resultado = inserirNoBigQuery($dados);

    if ($resultado === true) {
        error_log('Inserção no BigQuery bem-sucedida');
        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Dados salvos com sucesso'
        ]);
        exit;
    }

    error_log('Falha na inserção no BigQuery');
    http_response_code(500);
    echo json_encode([
        'erro' => 'Falha ao inserir no BigQuery',
        'detalhes' => 'A operação foi concluída mas não inseriu dados'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'erro' => 'Exceção capturada',
        'mensagem' => $e->getMessage()
    ]);
}
