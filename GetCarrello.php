<?php

require_once 'auth.php';
if (!$userid = checkAuth()) {
    header("Location: login.php");
    exit;
}
// Connessione al database
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
$carrello=array();
$query = "SELECT E.ID_Prodotto,E.Quantita,P.NomeProdotto,P.Prezzo,P.PrezzoScontato,P.Peso,P.LinkImmagine from ElementiCarrello E join Carrello C on C.ID=E.ID_Carrello join Prodotti P on P.Id=E.ID_Prodotto where ID_Cliente= $userid ";
$result = mysqli_query($conn, $query);
$num_rows = mysqli_num_rows($result);
$element=0;
$prezzototale=0;
while($row = mysqli_fetch_assoc($result))
      {
            if($row['Quantita']>1 )
            {
                  $row['Prezzo']=$row['Prezzo']*$row['Quantita'];
                  $row['PrezzoScontato']=$row['PrezzoScontato']*$row['Quantita'];
            }
            if($row['PrezzoScontato']===null|| $row['PrezzoScontato']==="")
            {
                  unset($row['PrezzoScontato']);
                  $prezzototale+=$row['Prezzo'];
            }
            else
            {
                  $row['Prezzo']=$row['PrezzoScontato'];
                  unset($row['PrezzoScontato']);
                  $prezzototale+=$row['Prezzo'];
            }
          
            if($element===$num_rows-1)
            {
                  $prezzototale = number_format($prezzototale, 2, '.', '');
                  $row['Righe'] = $num_rows;
                  $row['PrezzoTotale'] =$prezzototale;
            }  
            $element++;
            $carrello[] = $row;
      }
      // Chiudi
      mysqli_free_result($result);
      mysqli_close($conn);
      // Ritorna
 
      echo json_encode($carrello);



?>