<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quiz</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="/style.css" rel="stylesheet" type="text/css" />
    <!--<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>-->
</head>

<body style="background-color: #38B6FF">
<div class="container">
    <div id="principaleDiv">
        <h1> MATURIQUIZ </h1>
        <form method="post" action="gestioneAccesso.php">
        <button type="submit" name="ACCESSO" class="btn btn-secondary" data-bs-dismiss="modal">Accedi</button>
        </form>
        <form method="post" action="gestioneRegistrazione.php">
            <button type="submit" id="REGISTRAZIONE" class="btn btn-primary">Registrati</button>
        </form>
    </div>
</div>
</body>
</html>
