<?php
require_once 'auth.php';
if (!$userid = checkAuth()) {
    header("Location: login.php");
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

if (isset($_POST["IdProdotto"])) {
    // Rimuovi Prodotto dalla ListaDesideri
    $userid = mysqli_real_escape_string($conn, $userid);
    $IDProdotto = mysqli_real_escape_string($conn, $_POST["IdProdotto"]);

    // Esegui la query per rimuovere il prodotto dalla ListaDesideri
    $query = "DELETE FROM ElementiCarrello 
    WHERE ID_Carrello IN (
        SELECT ID 
        FROM Carrello 
        WHERE ID_Cliente = $userid
    ) AND ID_Prodotto = $IDProdotto;";
    if (mysqli_query($conn, $query) === TRUE) {
        echo "Prodotto rimosso dal Carrello con successo" . $userid;
    } else {
        echo "Errore: " . $query . "<br>" . $conn->error;
    }

    // Chiudi connessione
    mysqli_close($conn);
}
?>
