<?php

// $flashcards = $_POST["flashcards"];
$divDom = $_POST["domanda"];

$recordPunteggiManches = [];
$numeroDomanda = 0;

$domandeTot = [
    [
        "title" => "INFORMATICA",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "A cosa serve l'asterisco nelle query?",
                "risposta" => ["Sbagliata", "Sbagliata", "Corretta", "Sbagliata"],
                "punteggi" => [0, 0, 1, 0],
            ],
            [
                "id" => 2,
                "domanda" => "Cosa significa INSERT?",
                "risposta" => ["r1", "r2", "r3", "r4"],
                "punteggi" => [1, 0, 0, 0],
            ],
            [
                "id" => 3,
                "domanda" => "AAAAA",
                "risposta" => ["r1", "r2", "r3", "r4"],
                "punteggi" => [0, 0, 0, 1],
            ],
        ],
    ],

    [
        "title" => "MATEMATICA",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "La distribuzione binomiale è...",
                "risposta" => ["r1", "r2", "r3", "r4"],
            ],
            [
                "id" => 2,
                "domanda" => "La distribuzione binomiale è...",
                "risposta" => ["r1", "r2", "r3", "r4"],
            ],
        ],
    ],

    [
        "title" => "ITALIANO",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "Dove è nato l'autore Pirandello?",
                "risposta" => ["r1", "r2", "r3", "r4"],
            ],
            [
                "id" => 2,
                "domanda" => "Dove è nato l'autore Pirandello?",
                "risposta" => ["r1", "r2", "r3", "r4"],
            ],
        ],
    ],

    [
        "title" => "SISTEMI",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "L'attacco dell'uomo nel mezzo consiste in...",
                "risposta" => ["r1", "r2", "r3", "r4"],
            ],
            [
                "id" => 2,
                "domanda" => "L'attacco dell'uomo nel mezzo consiste in...",
                "risposta" => ["r1", "r2", "r3", "r4"],
            ],
        ],
    ],
];

$flashCards = [
    [
        "title" => "INFORMATICA",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
            [
                "id" => 2,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
        ],
    ],

    [
        "title" => "MATEMATICA",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
            [
                "id" => 2,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
        ],
    ],

    [
        "title" => "ITALIANO",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
            [
                "id" => 2,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
        ],
    ],

    [
        "title" => "SISTEMI",
        "quiz" => [
            [
                "id" => 1,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
            [
                "id" => 2,
                "domanda" => "Domanda a risposta aperta",
                "risposta" => "risposta",
            ],
        ],
    ],
];

/*
if(isset($_POST["flashcards"])) {
  // Esegui l'azione quando viene cliccato il pulsante "flashcards"
  header("Location: FlashCards.html");
  exit(); // Assicura che il codice successivo non venga eseguito dopo il reindirizzamento
}
*/

echo "DENTRO GESTIONEVIEW";

function renderDomande($domandeTot, $numMateria, $numDomanda, $divSpecifico)
{
    echo "renderDOmande in";

    $template = '<div class="container">
      <h1>%MATERIA</h1>
      <br>

      <div class="question-box">
        <div class="question">
          <p style="font-size: 22px;">%DOMANDA</p><br>
          <ol style="font-size: 18px;">
            <li>%OP1</li>
            <li>%OP2</li>
            <li>%OP3</li>
            <li>%OP4</li>
          </ol>
        </div>
      </div>
      <br>
      <div class="options">
        <button id="uno" class="btn btn-secondary b punt">Opzione 1</button>
        <button id="due" class="btn btn-secondary b punt">Opzione 2</button>
        <button id="tre" class="btn btn-secondary b punt">Opzione 3</button>
        <button id="quattro" class="btn btn-secondary b punt">Opzione 4</button>
      </div>
    </div>';

    $html = "";

    $row = $template;
    $row = str_replace("%MATERIA", $domandeTot[0]['title'], $row);
    $row = str_replace(
        "%DOMANDA",
        $domandeTot[$numMateria]['quiz'][$numDomanda]['domanda'],
        $row
    );
    $row = str_replace(
        "%OP1",
        $domandeTot[$numMateria]['quiz'][$numDomanda]['risposta'][0],
        $row
    );
    $row = str_replace(
        "%OP2",
        $domandeTot[$numMateria]['quiz'][$numDomanda]['risposta'][1],
        $row
    );
    $row = str_replace(
        "%OP3",
        $domandeTot[$numMateria]['quiz'][$numDomanda]['risposta'][2],
        $row
    );
    $row = str_replace(
        "%OP4",
        $domandeTot[$numMateria]['quiz'][$numDomanda]['risposta'][3],
        $row
    );

    $html .= $row;
    $divSpecifico->innerHTML = $html;


// equivalente di querySelectorAll in PHP
    $dom = new DOMDocument();
    $dom->loadHTML($html);

    $xpath = new DOMXPath($dom);
    $buttonRisposte = $xpath->query("//div[@class='options']//button");

    $corretto = false;
    $punteggioTot = 0;

    foreach ($buttonRisposte as $button) {
        if (isset($button)) {
            echo("button: ".$button['id']);
            for ($i = 0; $i < count($buttonRisposte); $i++) {
                echo($domandeTot[$numMateria]['quiz'][$numDomanda]['punteggi'][$i]);
                if ($domandeTot[$numMateria]['quiz'][$numDomanda]['punteggi'] === 1) {
                    // controllo correttezza su array punteggi
                    $corretto = true;
                } else {
                    $corretto = false;
                }
            }
            if ($corretto) {
                $punteggioTot++;
                echo("punteggio guadagnato: +" . 1);
            } else {
                echo("risposta sbagliata, punteggio invariato");
            }
            echo("punteggio totale: " .$punteggioTot);
            $numDomanda++;
            echo("Q#" .$numDomanda);
            echo("");

            if ($numDomanda < count($domandeTot[0]['quiz'])) {
                renderDomande($domandeTot, 0, $numDomanda, $divSpecifico);
            } else {
                echo("Tutte le domande sono state risposte");
            }
            echo "ID: " . $button->getAttribute("id") . ", Testo: " . $button->nodeValue . "<br>";
        }
    }
};

renderDomande($domandeTot, 0, $numeroDomanda, $divDom);

?>

