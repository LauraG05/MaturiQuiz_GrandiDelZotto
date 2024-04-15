
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
<div style="padding-left : 30px; padding-top : 30px; ">
    <button id="back" type="submit" class="btn btn-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" class="bi bi-caret-left"
             viewBox="0 0 16 16">
            <path
                d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
        </svg>
    </button>
</div>
<div class="container">
    <div id="gestioneAccessoDiv">
        <h4>Accesso</h4>
        <form method="POST" action="../signin.php" >
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="nome">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="word">
            </div>
            <button type="submit" id="SUBMIT" class="btn btn-primary">Login</button>
        </form>
    </div>
</div>
</body>
</html>
