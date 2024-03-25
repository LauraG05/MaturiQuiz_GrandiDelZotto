<?php

global $connessione;
require('connessioneDB.php');

function logIn($connessione, $nome)
{
    $sql = "
        SELECT password AS pass
        FROM utente
        WHERE nomeutente = $nome
    ";
    $result = $connessione->query($sql);
    return $result['pass'];
}

//mettere controlli
function signIn($connessione, $nome, $password)
{
    $sql = "
        INSERT INTO utente (nomeutente, password, rendimento)
        VALUES ('$nome','$password','0.00')
    ";
    $connessione->query($sql);
}

function aggiornaRendimento($connessione, $nome, $rendimento){
    $sql = "
        SELECT CONT(Quiz) AS Numero
        FROM risponde
        WHERE utente = $nome
    ";
    $result=mysqli_query($connessione, $sql);
    $result = $result['Numero']/10;
    $sql = "
        SELECT rendimento AS R
        FROM utente
        WHERE nomeutente = $nome
    ";
    $rend=mysqli_query($connessione, $sql);
    $rend=$rend['R']*($result-1);
    $rend=$rend+$rendimento;
    $rend=$rend/$result;
    $sql="UPDATE utente
SET rendimento = '$rend'
WHERE nomeutente = '$nome';
    ";
    $connessione->query($sql);
}

function getOpzioni($connessione, $domanda)
{
    $sql = "
        SELECT num, testo, CheckSoluzione AS matrice
        FROM opzione
        WHERE domanda = $domanda
    ";
    $result = $connessione->query($sql);
    return $result['matrice'];
}

function getQuiz($connessione, $nome, $data)
{
    $sql = "
         SELECT r.utente, r.scelta, r.domanda , q.dataora, q.materia, q.risultato AS tabella
        FROM risponde r 
        JOIN quiz q
        WHERE r.quiz=q.codiceID AND r.utente =$nome AND q.dataora = $data
    ";
    $result = $connessione->query($sql);
    return $result['tabella'];
}

function setQuiz($connessione, $data , $materia)
{
    $sql = "
        INSERT INTO quiz (dataora, materia, risultato)
        VALUES ('$data','$materia','0')
    ";
    $connessione->query($sql);
}
function updateQuiz($connessione, $id, $risultato)
{
       $sql="UPDATE Quiz
SET risultato = '$risultato'
WHERE codiceID = '$id';
    ";
    $connessione->query($sql);
}
function getCodiceQuiz($connessione, $dataora, $materia){
    $sql = "
        SELECT (codiceID) AS codice
        FROM quiz
        WHERE dataora= '$dataora' AND materia= '$materia'
    ";
    $result=mysqli_query($connessione, $sql);
    $result = $result['codice'];
    return $result;
}
function setRisponde($connessione, $scelta, $nome, $domanda, $quiz){

    $sql = "
        INSERT INTO risponde (scelta, utente, domanda,quiz)
        VALUES ('$scelta','$nome','$domanda','$quiz')
    ";
    $connessione->query($sql);
}

function getDomandeDaFare($connessione, $materia){
    $sql = "
        SELECT (id, testo) AS array
        FROM domande
        WHERE materia= '$materia'
    ";
    $result=mysqli_query($connessione, $sql);
    $result = $result['array'];
    $lunghezza = count($result);
    $domande= array(array());
    for ($i = 0; $i < 10; $i++) {
        $indice = mt_rand(0,$lunghezza- 1);
        $domande[$i][0] = $result[$indice][0];
        $domande[$i][1] = $result[$indice][1];
    }
    return $domande;
}

function getDomandeGiaFatte($connessione, $quiz){
    $sql = "
        SELECT d.testo AS domande
        FROM domande d
        JOIN risponde r
        WHERE d.id=r.domanda AND r.quiz='$quiz'
    ";
    $result = $connessione->query($sql);
    return $result['domande'];
}
