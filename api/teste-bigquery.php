<?php
// teste-bigquery.php
require __DIR__ . '/bigquery.php';

$dadosTeste = [
    'nome' => 'gustavo',
    'email' => 'gustavo@',
    'mensagem' => 'teste de banco',
    'dataEnvio' => date('c')
];

var_dump(inserirNoBigQuery($dadosTeste));
