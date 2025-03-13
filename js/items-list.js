const itens = [
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "multiple_page_titles", item_label: "Multiple (0%) Page Titles"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "over_60_characters_page_titles", item_label: "Over 60 Characters - Truncated (0%) Page Titles"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "missing_page_titles", item_label: "Missing (0%) Page Titles"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "duplicate_page_titles", item_label: "Duplicate (0%) Page Titles"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "missing_meta_descriptions", item_label: "Missing (0%) Meta Descriptions"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "duplicate_meta_descriptions", item_label: "Duplicate (0%) Meta Descriptions"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "over_155_characters_meta_descriptions", item_label: "Over 155 Characters - Truncated (0%) Meta Descriptions"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "seo_100", item_label: "SEO 100 Home e MPI"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "banners_links_mpi", item_label: "Banners - links para MPI Home"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "produtos_em_destaque", item_label: "Produtos em destaque Home"},
    {cat: "metadados_e_seo", cat_label: "Metadados e SEO", item: "coluna_lateral", item_label: "Coluna Lateral Todas as páginas"},
    {cat: "performance", cat_label: "Performance", item: "performance_60_home_e_mpi", item_label: "Performance > 60 Home e MPI"},
    {cat: "performance", cat_label: "Performance", item: "accessibility_90_home_e_mpi", item_label: "Accessibility > 90 Home e MPI"},
    {cat: "performance", cat_label: "Performance", item: "best_practices_90_home_e_mpi", item_label: "Best Pratices > 90 Home e MPI"},
    {cat: "performance", cat_label: "Performance", item: "footer_lazy_load_todas_as_paginas", item_label: "Footer Lazy Load Todas as páginas"},
    {cat: "validacao_de_codigo", cat_label: "Validação de Código", item: "w3c_html_home_e_mpi", item_label: "W3C HTML Home e MPI"},
    {cat: "validacao_de_codigo", cat_label: "Validação de Código", item: "w3c_css_home_e_mpi", item_label: "W3C CSS Home e MPI"},
    {cat: "urls", cat_label: "URLs", item: "non_ascii_characters_0_url", item_label: "Non ASCII Characters (0%) URL"},
    {cat: "urls", cat_label: "URLs", item: "uppercase_0_url", item_label: "Uppercase (0%) URL"},
    {cat: "urls", cat_label: "URLs", item: "multiple_slashes_0", item_label: "Multiple Slashes (0%)"},
    {cat: "urls", cat_label: "URLs", item: "contains_space_0", item_label: "Contains Space (0%)"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "missing_0_h1", item_label: "Missing (0%) H1"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "duplicate_0_h1", item_label: "Duplicate (0%) H1"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "multiple_0_h1", item_label: "Multiple (0%) H1"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "missing_0_h2", item_label: "Missing (0%) H2"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "nome_da_empresa_segmento_h1_home", item_label: "Nome da empresa + segmento (H1) Home"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "favicon_todas_as_paginas", item_label: "Favicon Todas as páginas"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "font_awesome_todas_as_paginas", item_label: "Font Awesome Todas as páginas"},
    {cat: "estrutura_semantica", cat_label: "Estrutura Semântica", item: "url_coerente_h1_pagina_todas_as_paginas", item_label: "URL coerente ao H1 da página Todas as páginas"},
    {cat: "fluxo", cat_label: "Fluxo", item: "pull_request", item_label: "Pull request"},
    {cat: "imagens", cat_label: "Imagens", item: "instrucao_1over_200kb_0_images", item_label: "Instrução 1Over 200kb (0%) Images"},
    {cat: "imagens", cat_label: "Imagens", item: "over_500kb_banner_0_images", item_label: "Over 500kb Banner (0%) Images"},
    {cat: "conteudo", cat_label: "Conteúdo", item: "spelling_errors_lorem_ipsum_content", item_label: "Spelling Errors (Lorem Ipsum) Content"},
    {cat: "conteudo", cat_label: "Conteúdo", item: "grammar_errors_lorem_ipsum_content", item_label: "Grammar Errors (Lorem Ipsum) Content"},
    {cat: "conteudo", cat_label: "Conteúdo", item: "readability_very_difficult_0_content", item_label: "Readability very difficult (0%) Content"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "botao_link_whatsapp_home", item_label: "Botão Link (WhatsApp) Home"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "mobile_smartphone_375px_home_e_mpi", item_label: "Mobile - Smartphone (375px) Home e MPI"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "mobile_tablet_768px_home_e_mpi", item_label: "Mobile - Tablet (768px) Home e MPI"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "active_menu_topo_todas_as_paginas", item_label: "Active menu topo Todas as páginas"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "botoes_links_clicaveis_todas_as_paginas", item_label: "Botões - links clicáveis Todas as páginas"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "contraste_entre_elementos_todas_as_paginas", item_label: "Contraste entre elementos Todas as páginas"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "breadcrumbs_todas_as_paginas", item_label: "Breadcrumbs Todas as páginas"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "menu_footer_menu_header_todas_as_paginas", item_label: "Menu Footer = Menu Header Todas as páginas"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "broken_image_or_components", item_label: "Broken Image or Components"},
    {cat: "layout_e_usabilidade", cat_label: "Layout e Usabilidade", item: "disproportionate_elements", item_label: "Disproportionate Elements"},
    {cat: "contato", cat_label: "Contato", item: "telefones", item_label: "Telefones"},
    {cat: "contato", cat_label: "Contato", item: "endereco", item_label: "Endereço"},
    {cat: "contato", cat_label: "Contato", item: "formatacao_de_endereco", item_label: "Formatação de endereço"},
    {cat: "formularios", cat_label: "Formulários", item: "botao_cta_formulario_home", item_label: "Botão CTA (formulário) Home"},
    {cat: "formularios", cat_label: "Formulários", item: "campos_do_formulario", item_label: "Campos do formulário"},
    {cat: "formularios", cat_label: "Formulários", item: "recaptcha_formulario", item_label: "Recaptcha formulário"},
    {cat: "resposta_do_servidor", cat_label: "Resposta do Sevidor", item: "success_200_response_codes", item_label: "Success (200) Response Codes"},
    {cat: "resposta_do_servidor", cat_label: "Resposta do Sevidor", item: "redirection_301_302_response_codes", item_label: "Redirection (301, 302)Response Codes"},
    {cat: "resposta_do_servidor", cat_label: "Resposta do Sevidor", item: "client_error_0_response_codes", item_label: "Client Error (0%) Response Codes"},
    {cat: "resposta_do_servidor", cat_label: "Resposta do Sevidor", item: "server_error_0_response_codes", item_label: "Server Error (0%) Response Codes"},
    {cat: "seguranca", cat_label: "Segurança", item: "https_urls_100", item_label: "HTTPS URL’s (100%)"},
    {cat: "seguranca", cat_label: "Segurança", item: "mixed_content_0", item_label: "Mixed Content (0%)"},
    {cat: "seguranca", cat_label: "Segurança", item: "links_externos_outlinks_target_blank_rel_nofollow", item_label: "Links Externos - Outlinks (target=”_blank” rel=”nofollow”)"},
    {cat: "seguranca", cat_label: "Segurança", item: "sem_self_redirect_quem_somos_home", item_label: "Sem Self redirect (Quem somos) Home"},
    {cat: "publicacao", cat_label: "Publicação", item: "mpis_cadastradas_no_spider", item_label: "MPIs Cadastradas no Spider"},
    {cat: "publicacao", cat_label: "Publicação", item: "configuracao_no_servidor_100", item_label: "Configuração no Servidor 100%"},
    {cat: "publicacao", cat_label: "Publicação", item: "apontamentos_dns_100", item_label: "Apontamentos DNS 100%"},
    {cat: "publicacao", cat_label: "Publicação", item: "sensedata_preenchido_100", item_label: "SenseData Preenchido 100%"},
    {cat: "publicacao", cat_label: "Publicação", item: "upload_sitemap_searchconsole", item_label: "Upload Sitemap Searchconsole"},
    {cat: "publicacao", cat_label: "Publicação", item: "redirects_funcionando", item_label: "Redirects Funcionando"},
    {cat: "publicacao", cat_label: "Publicação", item: "configuracao_metricas_analytics", item_label: "Configuração Metricas Analytics"},
    {cat: "publicacao", cat_label: "Publicação", item: "configuracao_recaptcha", item_label: "Configuração Recaptcha"},
    {cat: "publicacao", cat_label: "Publicação", item: "configuracao_htaccess", item_label: "Configuração htaccess"},
];
