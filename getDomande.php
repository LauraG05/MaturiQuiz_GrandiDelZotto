<?php
//FUNZIONE CHE PRENDE 5 DOMANDE CASUALI DAL DATABASE AVENDO IN INPUT LA MATERIA SELEZIONATA DAL CLIENT.
//RESTITUISCE UN ARRAY DI 5 TESTI DELLE DOMANDE RANDOMICHE DELLA MATERIA,
//STAMPARE LE DOMANDE.
// P.S. BISOGNA ANCHE SALVARE IN SESSIONE LA MATERIA PER DOPO :&)

global $connessione;
require('connessioneDB.php');
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $materia = $_POST['materia'];
    $sql = "
        SELECT (testo) AS array
        FROM domande
        WHERE materia= '" . $materia . "'
    ";

    $result = mysqli_query($connessione, $sql);
    $domandeGenerali = array();
    while ($row = $result->fetch_assoc()) {
        $domandeGenerali[] = $row['array'];
    }


    $domande = array(0, 0, 0, 0, 0);
    $numeriRipetuti = array();

    // Genera 5 numeri casuali unici tra 1 e 9
    while (sizeof($numeriRipetuti) < 5) {
        $indice = mt_rand(1, 9);
        if (!in_array($indice, $numeriRipetuti)) {
            $numeriRipetuti[] = $indice;
        }
    }

    for ($i = 0; $i < sizeof($domande); $i++) {
        $domande[$i] = $domandeGenerali[$numeriRipetuti[$i]];
    }
    echo json_encode($domandeGenerali);
    exit();
}