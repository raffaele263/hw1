<?php
require_once 'auth.php';
if (!$userid = checkAuth()) {
    header("Location: login.php");
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

if (isset($_POST["IdProdotto"])) {
    // Aggiungi Prodotto
    $userid = mysqli_real_escape_string($conn, $userid);
    $IDProdotto = mysqli_real_escape_string($conn, $_POST["IdProdotto"]);
    $query="SELECT * from ListaDesideri where ID_Prodotto=$IDProdotto and ID_Cliente=$userid";
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
   if( mysqli_num_rows($result)>0)
   {
    echo "Articolo già in Lista Desideri";
   }
   else
   {
$query2="INSERT INTO ListaDesideri(ID_Cliente,ID_Prodotto) VALUES ($userid,$IDProdotto)";
if (mysqli_query($conn, $query2) === TRUE) {
    echo "Prodotto aggiunto alla Lista con successo";
} else {
    echo "Errore: " . $query . "<br>" . $conn->error;
}
   }
    
 

    // Chiudi connessione
    mysqli_close($conn);
}
?>



