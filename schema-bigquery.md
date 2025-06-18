CREATE TABLE `id_projeto.id_dataset.id_table` (
  id STRING,
  dominio STRING,
  op_tipo STRING,
  id_cliente STRING,
  id_ticket STRING,
  analista_qa STRING,
  data_validacao DATE,
  analista_producao STRING,
  data_producao DATE,
  pontuacao INTEGER,
  porcentagem FLOAT64,
  pontuacao_maxima INTEGER,
  status STRING,
  core_web_vitals STRUCT<
  accessibility BOOL,
  best_pratices BOOL,
  performance BOOL,
  seo BOOL,
  footer_lazy_load BOOL,
  smartphone_banner BOOL
>,
  metadados_seo STRUCT<
  banners_link_mpis BOOL,
  breadcrumbs BOOL,
  enterprise_name_h1_home BOOL,
  featured_products BOOL,
  menu_header_footer BOOL,
  mpis_pages BOOL,
  side_column BOOL,
  sitemap_links BOOL,
  url_match_h1_page BOOL,
  links_internal_nofollow BOOL,
  meta_discriptions_duplicate BOOL,
  meta_discriptions_missing BOOL,
  meta_discriptions_over_caracters BOOL,
  page_titles_duplicate BOOL,
  page_titles_missing BOOL,
  page_titles_multiple BOOL,
  page_titles_over_caracteres BOOL
>,
  validacao_codigo STRUCT<
  backup_bd BOOL,
  buttons_clickable BOOL,
  config_gitignore BOOL,
  old_archives BOOL,
  popup_cookie BOOL,
  content_lorem_ipsum_placeholder BOOL,
  font_awesome BOOL,
  w3c_css BOOL,
  w3c_html BOOL
>,
  estrutura_semantica STRUCT<
  h1_duplicate BOOL,
  h1_missing BOOL,
  h1_multiple BOOL,
  h2_missing BOOL
>,
  urls STRUCT<
  redirect_serp_404 BOOL,
  redirect_www BOOL,
  urls_contains_space BOOL,
  urls_multiple_slashes BOOL,
  urls_non_ascii_caracters BOOL,
  urls_over_caracters BOOL,
  urls_uppercase BOOL
>,
  contato STRUCT<
  cta_container BOOL,
  cta_whatsapp BOOL,
  formatting_address BOOL,
  formatting_fone BOOL,
  formatting_mail BOOL,
  text_address BOOL,
  text_fone BOOL,
  text_mail BOOL
>,
  formulario STRUCT<
  form_leads BOOL,
  form_mask BOOL,
  form_recaptcha BOOL
>,
  imagens STRUCT<
  image_broke BOOL,
  image_favicon BOOL,
  image_banner_over BOOL,
  image_over BOOL
>,
  layout_usabilidade STRUCT<
  buttons_active_menu BOOL,
  buttons_back_top BOOL,
  desktop_disproportionate_elements BOOL,
  elements_contrast BOOL,
  horizontal_scroll BOOL,
  smartphone_disproportionate_elements BOOL,
  smartphone_footer BOOL,
  smartphone_google_map BOOL,
  smartphone_mobile_menu BOOL,
  tablet_disproportionate_elements BOOL,
  tablet_footer BOOL,
  tablet_google_map BOOL,
  tablet_mobile_menu BOOL
>,
  resposta_servidor STRUCT<
  response_code_client_error BOOL,
  response_code_redirection BOOL,
  response_code_server_error BOOL,
  response_code_success BOOL
>,
  seguranca STRUCT<
  security_https_urls BOOL,
  security_missing_content_security_policy BOOL,
  security_missing_hsts BOOL,
  security_missing_secure_referrer_policy BOOL,
  security_missing_x_content_type_options BOOL,
  security_missing_x_frame_options BOOL,
  security_mixed_content BOOL
>,
  publicacao STRUCT<
  config_analytics BOOL,
  config_crm BOOL,
  config_mpisistema BOOL,
  config_searchconsole BOOL,
  config_spider BOOL
>
);
