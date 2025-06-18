# PRONTUARIO DE VALIDAÇÃO

> Formulario de Checklist Utilizado pelo time de QA Doutores da Web para validação de sites focado em SEO

## Funcionalidades
* Login apenas para email corporativo da Doutores da Web
* Filtro de email permitidos em uma whitelist
* Calcula Resultado da Validação por um sistema de pontuação por peso das Categoria
* Gera PDF com o resultado da validação, com erros, observações e evidencias
* Salva Resultado da validação no Bigquery, todos os itens aprovados e reprovados

## Configuração do Sistemas

Para que o sistema funcione por completo, alguns arquivos e ambientes precisam ser configurados:

1. Configuração de Azure IAM
2. Configuração de Banco de Dados BigQuery
3. Configuração do arquivo .env
4. Configuração do arquivo bigquery-key.json

### Configuração do Azure APP

Registre um novo aplicativo no Azure em "Azure Active Directory"

1. Acesse *Azure Active Directory*
2. Acesse *App Registry* e faça um novo registro
    1. Com isso já temos o *ID do aplicativo (cliente)* e *ID do diretório (locatário)*
3. Acesse *Certificados e Segredos* e crie um novo Token Secreto 
    1. Com isso temos o *Cliente Secret*
4. Acesse *Permissões de APIs* e adicione as seguintes permissões 
    1. *GroupsMember.Read.All*
    2. *User.Read*
5. Acesse *Autenticação* e adicione as URIs de Redirecionamento e URLs de Logoff, Troque o dominio e repositorio pelos nomes reais:
    1. URIs de Redirecionamento - https://dominio.com.br/repositorio/auth/callback.php
    2. URL de Logoff - https://dominio.com.br/repositorio

### Configuração de Banco de Dados no BigQuery

Ative a API do BigQuery no *Google Cloud Plataform* e acesso o mesmo para realizar as configurações

1. Crie um Dataset 
2. Execute o comando em SQL para criar uma nova tabela com o Schema dos dados já configurado

[BigQuery Schema SQL](https://github.com/Guxxis/prontuario-qa/blob/main/schema-bigquery.txt)

*obs: lembre de trocar os IDs do CREATE TABLE*

Com isso temos os IDs de projeto, dataset e tabela para configura o .env

### Configuração das Credencias GCP

Configure uma nova conta de serviço para liberar acesso da API do Bigquery na aplicação

1. Acesse o painel *IAM*
2. Acesse *Conta de Serviço* e crie um nova conta
3. Acesse a conta de serviço criada e em *Chaves*,  
    1. adicione uma nova chave do tipo JSON
    2. salve o arquivo

### Configuração do arquivo JSON Credencial BigQuery

Para configurar os acessos GCP no projeto

1. Acesse a pasta *config* no repositorio
2. Criei um arquivo nomeado "bigquery-key.json"
3. Salve o conteudo do arquivo JSON criando no passo anterior no GCP

### Configuração do arquivo .env

Na raiz do projeto crie um arquivo ".env" seguindo o preenchimento das variaveis

Todos os valores das variaveis foram criadas nos passos anteriores

```
AZURE_CLIENT_ID=ID do aplicativo (cliente)
AZURE_CLIENT_SECRET=Client Secret
AZURE_TENANT_ID=ID do diretório (locatário)
AZURE_REDIRECT_URI=https://dominio.com.br/prontuario-qa
BIGQUERY_KEY_PATH=../config/bigquery-key.json
BIGQUERY_PROJECT_ID=ID do projeto no BigQuery
BIGQUERY_DATASET_ID=ID do dataset no Bigquery
BIGQUERY_TABLE_ID=ID da tabela no Bigquery
```

> Seguindo os passos anteriores o prontuario está pronto para ser utilizado pelos usuarios, sendo necessarios apenas configurar um ultimo detalhe que é o filtro de emails permitidos dentro do sistema

## Configuração do Whitelist

Caso seja necessario o filtro de email para utilização do prontuario, dentro do repositorio acesse o arquivo auth/callback.php

Descomente a variavel `$allowedEmails` e informe quais emails serão permitidos dentro do sistema


*prontuario de validação - v.1.0.0*

*Criado por: Gustavo Gonçalves* - [Site](https://guxxis.com) - [Github](https://github.com/Guxxis)
