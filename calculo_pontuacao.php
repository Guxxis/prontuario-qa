<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    // Realize os cálculos necessários...

    // Retorna o resultado para o AJAX
    echo "<strong>Pontuação Calculada:</strong> 85%"; 
}
?>