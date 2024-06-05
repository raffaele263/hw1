<?php
    require_once 'auth.php';

    if (checkAuth()) {
        header("Location: home.php");
        exit;
    }   

    if (!empty($_POST["NomeUtente"]) && !empty($_POST["Email"]) && !empty($_POST["Cellulare"]) && !empty($_POST["NumeroFisso"]) && !empty($_POST["Cap"])&&
        !empty($_POST["Indirizzo"]) && !empty($_POST["Password"]) && !empty($_POST["ButtonReg"]))
    {
        $error = array();
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['NomeUtente'])) {
            $error[] = "NomeUtente non valido";
        } else {
            $NomeUtente = mysqli_real_escape_string($conn, $_POST['NomeUtentename']);
            $query = "SELECT NomeUtente FROM Utenti WHERE NomeUtente = '$NomeUtente'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "NomeUtente già utilizzato";
            }
        }

        if (strlen($_POST["Password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
        } 

      //  if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
    //        $error[] = "Le password non coincidono";
      //  }

        if (!filter_var($_POST['Email'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['Email']));
            $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }



        if (count($error) == 0) {
            $name = mysqli_real_escape_string($conn, $_POST['NomeUtente']);
            $Cellulare = mysqli_real_escape_string($conn, $_POST['Cellulare']);
            $NumeroFisso=mysqli_real_escape_string($conn,$_POST['NumeroFisso']);
            $Cap=mysqli_real_escape_string($conn,$_POST['Cap']);
            $Indirizzo=mysqli_real_escape_string($conn,$_POST['Indirizzo']);
            $password = mysqli_real_escape_string($conn, $_POST['Password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO Utenti(NomeUtente, password, Cellulare, NumeroFisso,CapReg,Indirizzo, Email) VALUES('$NomeUtente', '$password','$Cellulare','$NumeroFisso','$Cap','$Indirizzo', '$email')";
            
            if (mysqli_query($conn, $query)) {
                $_SESSION["_agora_username"] = $_POST["NomeUtente"];
                $_SESSION["_agora_user_id"] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: hw1\home.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }

        mysqli_close($conn);
    }
    else if (isset($_POST["NomeUtente"])) {
        $error = array("Riempi tutti i campi");
    }

?>



<html>
    <head>
<title>Registrazione Bulk</title>
<link rel="stylesheet" href="Registrazione.css">
    </head>
    <body>
        
        <div id="Login">
            <div id="Imgbulk"></div>
            <form id="Loginform">
            <p class="TextLogin">Nome Utente:</p>
            <input class="inputlogin" type='NomeUtente' name='NomeUtente' id="NomeUtenteReg" <?php if(isset($_POST["NomeUtente"])){echo "value=".$_POST["NomeUtente"];} ?>>
            <p class="TextLogin">E-Mail:</p>
            <input class="inputlogin" type='Email' name='Email' id="EmailReg" <?php if(isset($_POST["Email"])){echo "value=".$_POST["Email"];} ?>>
            <p class="TextLogin">Cellulare</p>
            <input class="inputlogin" type='Cellulare' name='Cellulare' id="CellulareReg"<?php if(isset($_POST["Cellulare"])){echo "value=".$_POST["Cellulare"];} ?> >
            <p class="TextLogin">NumeroFisso:</p>
            <input class="inputlogin"  type='NumeroFisso' name='NumeroFisso' id="NumeroFissoReg"<?php if(isset($_POST["NumeroFisso"])){echo "value=".$_POST["NumeroFisso"];} ?> >
            <p class="TextLogin">Cap</p>
            <input class="inputlogin"  type='Cap' name='Cap' id="CapReg" <?php if(isset($_POST["Cap"])){echo "value=".$_POST["Cap"];} ?>>
            <p class="TextLogin">Indirizzo</p>
            <input class="inputlogin" type='Indirizzo' name='Indirizzo' id="IndirizzoReg"<?php if(isset($_POST["Indirizzo"])){echo "value=".$_POST["Indirizzo"];} ?> >
            <p class="TextLogin">Password:</p>
            <input class="inputlogin"  type='Password' name='Password' id="PasswordReg" <?php if(isset($_POST["Password"])){echo "value=".$_POST["Password"];} ?>>
            <div class="allow"> 
                    <input type='checkbox' name='allow' value="1" <?php if(isset($_POST["allow"])){echo $_POST["allow"] ? "checked" : "";} ?>>
                    <label for='allow'>Accetto i termini e condizioni d'uso di Bulk.</label>
                </div>
                <?php if(isset($error)) {
                    foreach($error as $err) {
                        echo "<div class='errorj'><img src='./assets/close.svg'/><span>".$err."</span></div>";
                    }
                } ?>
            <input id="ButtonReg" type="button" name="ButtonReg" value="Salva">
            </form>
            
        </div>
    

    </body>
</html>