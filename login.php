<?php

//FUNZIONE PER LA LOGIN, PRENDE IN INGRESSO NOME E PASSWORD INSERITI DA CLIENT,
// E RESTITUISCE TRUE SE IL LOGIN CORRISPONDE
//O FALSE SE LA LOGIN NON FUNZIONA, SE LA LOGIN RESTITUISCE TRUE, BISOGNA NEL CLIENT SALVARE
// IN SESSIONE IL NOME UTENTE.
global $connessione;
require('connessioneDB.php');

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $word = $_POST['word'];
    $sql = '
        SELECT * 
        FROM utente
        WHERE nomeutente = "'.$nome.'" AND password = "'.$word.'"';
    $result = $connessione->query($sql);
    if ($result->num_rows > 0){
        header("location: ./public/login.html");
    }else{
        //echo false;
        // header("location: ./public/login.html");
    }
}
?>