<?php

require_once 'auth.php';
if (!$userid = checkAuth()) {
    header("Location: login.php");
    exit;
}
// Connessione al database
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
$carrello=array();
$query = "SELECT P.* from ListaDesideri L join Prodotti P on L.ID_Prodotto=P.id where ID_Cliente= $userid order by P.id";
$result = mysqli_query($conn, $query);
while($row = mysqli_fetch_assoc($result))
      {
            $carrello[] = $row;
      }
      // Chiudi
      mysqli_free_result($result);
      mysqli_close($conn);
      // Ritorna
 
      echo json_encode($carrello);



?>