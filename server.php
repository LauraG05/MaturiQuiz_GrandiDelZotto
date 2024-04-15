<?php

global $connessione;
require('connessioneDB.php');

//FUNZIONE DA RICHIAMARE DOPO LE DOMANDE
// CHE PRENDE IN INGRESSO L'ARRAY DI DOMANDE PRESE DALLA FUNZIONE PRECEDENTE
// E CHE RESTITUISCE UNA MATRICE CON DENTRO IL TESTO DELLE OPZIONI DI OGNI DOMANDA
// E IL CORRISPETTIVO CHECK DELLA SOLUZIONE
function getOpzioni($connessione, $domande)
{
    $id=[0,0,0,0,0];
    for($i=0;$i< sizeof($domande);$i++){
        $sql = "
        SELECT (id) 
        FROM domande
        WHERE testo= '$domande[$i]'
    ";
        $result = mysqli_query($connessione, $sql);
        $id[$i] = $result;
    }

    $finale=[[0,0],[1,1],[2,2],[3,3],[4,4]];
    for($j=0;$j<sizeof($id);$j++){
        $sql = "
        SELECT testo, CheckSoluzione AS matrice
        FROM opzione
        WHERE domanda = '$id[$j]'
    ";
        $result = mysqli_query($connessione, $sql);
        $finale[$j]=$result;
    }
    return $finale;
}


//UNA VOLTA SELEZIONATA LA MATERIA, SI RICHIAMANO LE DUE FUNZIONI DI SOPRA
// E SI STAMPANO DOMANDE AFFIANCATE ALLE LORO OPZIONI ( SOLO IL TESTO VA STAMPATO )
// SUBITO DOPO  SI CREA IL QUIZ, INSERENDO LA MATERIA PRESA DALLA SESSIONE
// E SI METTE ANCHE LA DATA ATTUALE, CHE POI PER DOPO ANDREMO A SALVARE IN SESSIONE
function setQuiz($connessione, $data , $materia)
{
    $sql = "
        INSERT INTO quiz (dataora, materia, risultato)
        VALUES ('$data','$materia','0')
    ";
    $connessione->query($sql);
}

//OGNI VOLTA CHE L'UTENTE RISPONDE AD UNA DOMANDA DEL QUIZ RICHIAMEREMO STA FUNZIONE PER INSERIRE
//NELLA TABELLA "RISPONDE" LA RISPOSTA DEL BRO, INSERENDO NOME (DALLA SESSIONE), LA SCELTA (DA 1 A 4) PRESA DAL CLIENT
// LA DOMANDA ALLA QUALE RISPONDE (TU INSERIRAI IL TESTO DELLA DOMANDA E DENTRO NE ESTRAGGO L'ID)
//E IL QUIZ (ID) CHE TI VERRA' RESTITUITO CON LA FUNZIONE GETCODICEQUIZ, APPENA SOTTO QUESTA QUI.
function setRisponde($connessione, $scelta, $nome, $domanda, $quiz){

    $sql = "
        INSERT INTO risponde (scelta, utente, domanda,quiz)
        VALUES ('$scelta','$nome','$domanda','$quiz')
    ";
    $connessione->query($sql);
}

//FUNZIONE CHE TI DICEVO PRIMA PER L'INSERIMENTO DEL CODICE QUIZ IN SETRISPONDE,
// QUI DEVI INSERIRE LA MATERIA E LA DATA DI INIZIO DEL QUIZ PRESI ENTRAMBI DALLA SESSIONE
function getCodiceQuiz($connessione, $dataora, $materia){
    $sql = "
        SELECT (codiceID)
        FROM quiz
        WHERE dataora= '$dataora' AND materia= '$materia'
    ";
    $result=mysqli_query($connessione, $sql);
    return $result;
}

//FINITO IL QUIZ CALCOLERAI NEL CLIENT CON UNA FUNZIONE IN BASE ALLE RISPOSTE IL PUNTEGGIO DEL BRO
// (CONTANDO CHE UNA RISPOSTA VALE 2 PUNTI) E RICHIAMERAI STA FUNZIONE PER AGGIORNARE LA SUA MEDIA
// P.S. I CALCOLI LI HO GIA' FATTI IO <3
//TU DEVI SOLO INSERIRE IL NOME PRESO DALLA SESSIONE E IL VOTO CALCOLATO NEL CLIENT CON LE RISPOSTE DATE
function aggiornaRendimento($connessione, $nome, $rendimento){
    $sql = "
        SELECT CONT(Quiz) AS Numero
        FROM risponde
        WHERE utente = $nome
    ";
    $result=mysqli_query($connessione, $sql);
    $result = $result['Numero']/5;
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

//FATTO TUTTO DEVI ANCHE AGGIORNARE IL QUIZ CREATO ALLA SELEZIONE DELLA MATERIA (OVVERO QUELLO APPENA CONCLUSO)
// CON IL VOTO PRESO, QUI DEVI USARE ANCORA LA FUNZIONE GETCODICEQUIZ USATO PRIMA PER AVERE IL CODICE DEL QUIZ ATTUALE
//PER POI DARLO IN INGRESSO A STA FUNZIONE CHE, INSIEME AL RISULTATO (IL PUNTEGGIO CHE HAI CALCOLATO NEL CLIENT)
//AGGIORNA IL SINGOLO QUIZ NEL DB
function updateQuiz($connessione, $id, $risultato)
{
    $sql="UPDATE Quiz
SET risultato = '$risultato'
WHERE codiceID = '$id';
    ";
    $connessione->query($sql);
}


//ALLA FINE SE IL BRO VOLESSE VEDERE QUIZ VECCHI DEVE AVERE LA POSSIBILITA' DI SCEGLIERLI:SENTI AMME'
// USA STA FUNZIA CHE TI CHIEDE SOLO IL NOME PRESO DALLA SESSIONE E TI RESTITUISCE UNA MATRICE PER LA SELECT
//DEI QUIZ CONTENENTE IL CODICE, LA DATA, LA MATERIA E IL RISULTATO DI OGNI TEST DELL'USER
function getAllQuiz($connessione, $nome)
{
    $sql = "SELECT Quiz AS AllQuiz FROM risponde WHERE utente = '$nome'";
    $result = $connessione->query($sql);
    $result= $result['AllQuiz'];
    $finale= ripulisci($result);
    $output=[[0,0,0,0]];
    for($i=0;$i<sizeof($finale);$i++){
        $sql = "SELECT codiceID, dataora, materia, risultato FROM Quiz WHERE codiceID = '$finale[$i]'";
        $output[$i]=$connessione->query($sql);
    }
    return $output;
}

//FUNZIONE CHE CANCELLA QUALSIASI RIPETIZINE NELL'ARRAY CON OVVIE RIPETIZIONI DI GETALLQUIZ (NON TESTATO)
function ripulisci($array){
    $finale=[];
    $ripetuti=[-1];
    $passa=true;
    for($i=0;$i<sizeof($array);$i++){
        for($j=0;$j<sizeof($ripetuti);$j++){
            if($ripetuti[$j]===$array[$i]){
                $passa=false;
            }
        }
        if($passa){
            $ripetuti[$i]=$array[$i];
            $finale[$i]=$array[$i];
        }
    }
    return $finale;
}

//UNA VOLTA CLICCATO SUL QUIZ CHE SI VUOLE VEDERE INSERISCI DALLA MATRICE PRESA PRIMA LA DATA DEL QUIZ SCELTO
// E IL NOME PRESO DALLA SESSIONE, LA FUNZIONE RESTITUISCE LE COSE DA STAMPARE DEL QUIZ SCELTO: LA SCELTA,
// LA DOMANDA, LA MATERIA E IL RISULTATO. PER QUANTO RIGUARDA STAMPEREMO ANCHE IL NOME E LA DATA (STESSI CHE METTIAMO IN INPUT)
function getQuiz($connessione, $nome, $data)
{
    $sql = "
         SELECT r.scelta, r.domanda , q.materia, q.risultato AS tabella
        FROM risponde r 
        JOIN quiz q
        WHERE r.quiz=q.codiceID AND r.utente =$nome AND q.dataora = $data
    ";
    $result = $connessione->query($sql);
    return $result['tabella'];
}
//PER COMPLETARE LA VISIONE DELLA TABELLA DEL QUIZ PRECEDENTE SCELTO DOBBIAMO STAMPARE ANCHE I TESTI DELLE DOMANDE DI
//QUEL TEST.
//USA STA FUNZIONE, CHE PRENDE IN INCRESSO L'ID QUIZ DEL QUIZ SCELTO. SFORNA L'ARRAY CON IL TESTO DELL DOMANDE
function getDomandeGiaFatte($connessione, $quiz){
    $sql = "
        SELECT d.testo
        FROM domande d
        JOIN risponde r
        WHERE d.id=r.domanda AND r.quiz='$quiz'
    ";
    $result = $connessione->query($sql);
    return $result['domande'];
}
