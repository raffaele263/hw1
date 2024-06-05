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
    $query = "SELECT ID FROM Carrello WHERE ID_Cliente = $userid AND Attivo=true";
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));

    if (mysqli_num_rows($result) > 0) {
        // Il cliente ha già un carrello, quindi prendi l'ID del carrello
        $row = mysqli_fetch_assoc($result);
        $ID_Carrello = $row["ID"];
    } else {
        // Il cliente non ha un carrello, quindi creane uno nuovo
        $query = "INSERT INTO Carrello (ID_Cliente) VALUES ($userid)";
        if (mysqli_query($conn, $query) === TRUE) {
            $ID_Carrello = $conn->insert_id;
        } else {
            echo "Error: " . $query . "<br>" . $conn->error;
            mysqli_close($conn);
            exit();
        }
    }

    $query2 = "SELECT E.Quantita, E.ID_Carrello, E.ID_Prodotto 
               FROM ElementiCarrello E 
               JOIN Carrello C ON C.ID = E.ID_Carrello 
               WHERE C.ID_Cliente = $userid AND E.ID_Prodotto = $IDProdotto";
    $result2 = mysqli_query($conn, $query2) or die(mysqli_error($conn));

    if (mysqli_num_rows($result2) > 0) {
        $row2 = mysqli_fetch_assoc($result2);
        $new_quantity = $row2["Quantita"] + 1;
        $query = "UPDATE ElementiCarrello SET Quantita = $new_quantity WHERE ID_Carrello = " . $row2["ID_Carrello"] . " AND ID_Prodotto = " . $row2["ID_Prodotto"];
    } else {
        $query = "INSERT INTO ElementiCarrello(ID_Carrello, ID_Prodotto, Quantita) VALUES ($ID_Carrello, $IDProdotto, 1)";
    }

    if (mysqli_query($conn, $query) === TRUE) {
        echo "Prodotto aggiunto al carrello con successo";
    } else {
        echo "Errore: " . $query . "<br>" . $conn->error;
    }

    // Chiudi connessione
    mysqli_close($conn);
}
?>



