<html>
<!-- // sceltaMaterie.html -->

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
    <link href="/style.css" rel="stylesheet" type="text/css" />
    <style>
        html,
        body {
            height: 100%;
        }

        .container-fluid {
            height: 100%;
            width: 100%;
        }

        .full-height-button {
            height: 100%;
            width: 100%;
        }
    </style>
</head>

<body style="background-color: #38b6ff">
<!--
<div style="padding-left: 30; padding-top: 30">
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
</div>

<button
  type="button"
  id="INFO"
  class="btn btn-primary"
  data-bs-dismiss="modal"
>
  Informatica
</button>
<button type="button" id="MATE" class="btn btn-primary">Matematica</button>
<button type="button" id="ITA" class="btn btn-primary">Italiano</button>
<button type="button" id="SIS" class="btn btn-primary">Sistemi</button>
-->
<div class="container-fluid">
    <div class="row" style="height: 50vh">
        <div class="col" style="height: 100%">
            <form method="post" action="./materie/informatica.php">
            <button
                id="INFO"
                style="padding-left: 0px"
                class="btn btn-yellow w-100 full-height-button"
            >
                Informatica
            </button>
            </form>
        </div>
        <form method="post" action="./materie/matematica.php">
        <div class="col" style="height: 100%">
            <button
                id="MATE"
                class="btn btn-black text-white w-100 full-height-button"
            >
                Matematica
            </button>
        </div>
        </form>
    </div>
    <form method="post" action="./materie/italiano.php">
    <div class="row" style="height: 50vh">
        <div class="col" style="height: 100%">
            <button
                id="ITA"
                class="btn btn-black text-white w-100 full-height-button"
            >
                Italiano
            </button>
        </div>
    </div>
        <form method="post" action="./materie/sistemi.php">
        <div class="col" style="height: 100%">
            <button id="SIS" class="btn btn-yellow w-100 full-height-button">
                Sistemi
            </button>
        </div>
        </form>
    </div>
</div>
</body>
</html>
