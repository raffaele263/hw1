<?php

require_once 'dbconfig.php';
// Connessione al database
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
$eventi=array();
$query = "SELECT P.id, P.NomeProdotto,P.NomeProdotto,P.Prezzo,P.PrezzoScontato,P.Peso,P.Categoria,P.NuovoProdotto,P.LinkImmagine, COUNT(*) as Gusti FROM Prodotti P GROUP BY Peso, NomeProdotto,Categoria order by P.id;";
$result = mysqli_query($conn, $query);
while($row = mysqli_fetch_assoc($result))
      {
            $eventi[] = $row;
      }
      // Chiudi
      mysqli_free_result($result);
      mysqli_close($conn);
      // Ritorna
 
      echo json_encode($eventi);



?>