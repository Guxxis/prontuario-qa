<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário PHP</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="form-container">
        <h2>Formulario de Validação</h2>
        <form action="processa_form.php" method="post">
            <label for="nome">Nome:</label>
            <input type="text" name="nome" required>

            <label for="email">Email:</label>
            <input type="email" name="email" required>

            <label for="dominio">Domínio:</label>
            <input type="text" name="dominio" required>

            <button type="submit">Enviar</button>
        </form>
    </div>
</body>

</html>