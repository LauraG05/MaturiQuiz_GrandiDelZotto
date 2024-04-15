<?php

//FUNZIONE PER LA REGISTRAZIONE, PRENDE IN INGRESSO NOME E PASSWORD INSERITI DA CLIENT,
// E RESTITUISCE TRUE SE FUNZIONA O FALSE ALTRIMENTI
// OVVIAMENTE ANCHE QUI SE LA REGISTRAZIONE FUNZIONA BISOGNA POI SALVARE IN SESSIONE IL NOME DELL'UTENTE
global $connessione;
require('connessioneDB.php');

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $word = $_POST['word'];
    $sql = 'SELECT nomeutente FROM utente WHERE nomeutente = "$nome"';
    $sqlAdd = "
    INSERT INTO utente (nomeutente, password, rendimento)
    VALUES ('$nome','$word','0.00')
    ";
    $result = $connessione->query($sql);
    if ($result->num_rows > 0){
        echo "miao";
        //echo true;
        header("location: ./public/index.php");
    }else{
        //echo false
        $connessione->query($sqlAdd);
        echo "aggiunto";
        //header("location: ./public/index.php");
    }
}
?>


