<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Quiz</title>
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossorigin="anonymous"
    />

    <style>
        body {
            margin: 0;
            padding: 0;
        }

        .container {
            text-align: center;
            margin-top: 10px;
        }

        .question-box {
            text-align: left;
            background-color: black;
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 20px;
            height: 400px;
        }

        .question {
            padding: 30px;
        }

        .options {
            display: flex;
            justify-content: center;
        }

        .b {
            background-color: #e4e46f;
            color: 0;
            border: none;
            flex: 1;
            margin: 0 5px;
            font-size: 16px;
            border-radius: 5px;
        }
    </style>

    <!--  <link href="/style.css" rel="stylesheet" type="text/css" />-->
</head>

<body style="background-color: #38b6ff">
<div style="padding-left: 30px; padding-top: 30px">
    <form method="POST" action="../sceltaMaterie.php">
    <button id="back" type="submit" class="btn btn-secondary">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="18"
                fill="currentColor"
                class="bi bi-caret-left"
                viewBox="0 0 16 16"
        >
            <path
                    d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"
            />
        </svg>
    </button>
    </form>
</div>
<div style="margin-left: auto; margin-right: calc(100% - 30px)">
    <button id="flashcards" type="submit" class="btn btn-primary">
        FlashCards
    </button>
</div>

<div id="domanda"></div>
<!-- <script type="module" src="gestioneViewDomande.php"></script> -->
<?php
//require ("../gestioneViewDomande.php")
?>

<script src="informatica.js"></script>

</body>
</html>
