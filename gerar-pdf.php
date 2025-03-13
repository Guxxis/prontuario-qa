<?php
require_once('tcpdf/tcpdf.php'); // Certifique-se de que a biblioteca TCPDF está instalada

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pontuacao = $_POST['pontuacao'] ?? 'N/A';
    $erros = $_POST['erros'] ? explode(', ', $_POST['erros']) : [];

    // Criando um novo PDF
    $pdf = new TCPDF();
    $pdf->SetCreator('Sistema de QA');
    $pdf->SetAuthor('Validação de QA');
    $pdf->SetTitle('Relatório de Validação');
    $pdf->SetMargins(15, 15, 15);
    $pdf->AddPage();

    // Cabeçalho do documento
    $pdf->SetFont('helvetica', 'B', 16);
    $pdf->Cell(0, 10, 'Relatório de Validação de QA', 0, 1, 'C');
    $pdf->Ln(5);

    // Pontuação final
    $pdf->SetFont('helvetica', '', 12);
    $pdf->Cell(0, 10, 'Pontuação Final: ' . $pontuacao . '%', 0, 1);
    $pdf->Ln(5);

    // Erros encontrados
    if (!empty($erros)) {
        $pdf->SetFont('helvetica', 'B', 12);
        $pdf->Cell(0, 10, 'Erros Encontrados:', 0, 1);
        $pdf->SetFont('helvetica', '', 12);
        foreach ($erros as $erro) {
            $pdf->Cell(0, 10, '- ' . $erro, 0, 1);
        }
    } else {
        $pdf->Cell(0, 10, 'Nenhum erro encontrado.', 0, 1);
    }

    // Saída do PDF
    $pdf->Output('validacao_qa.pdf', 'D');
} else {
    echo "Acesso inválido.";
}