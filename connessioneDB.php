<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "maturiquiz";

$connessione = new mysqli($host, $username, $password, $database);
if ($connessione->connect_error) {
    die("Connection ERROR: " . $connessione->connect_error);
}
