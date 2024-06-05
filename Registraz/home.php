<?php
    include 'auth.php';
    if (checkAuth()) {
        header('Location: home.php');
        exit;
    }

    if (!empty($_POST["NomeUtente"]) && !empty($_POST["password"]) )
    {

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $NomeUtente = mysqli_real_escape_string($conn, $_POST['NomeUtente']);
        $query = "SELECT * FROM Utenti WHERE NomeUtente = '".$NomeUtente."'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        
        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['password'])) {

                // Imposto una sessione dell'utente
                $_SESSION["_agora_username"] = $entry['NomeUtente'];
                $_SESSION["_agora_user_id"] = $entry['id'];
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        $error = "Nome Utente e/o password errati.";
    }
    else if (isset($_POST["NomeUtente"]) || isset($_POST["password"])) {
        $error = "Inserisci Nome Utente e password.";
    }

?>




<html>
    <head>
<title>Registrazione Bulk</title>
<link rel="stylesheet" href="Login.css">
    </head>
    <body>
        <?php
                if (isset($error)) {
                    echo "<p class='error'>$error</p>";
                }
                
            ?>
        <div id="Login">
            <div id="Imgbulk"></div>
            <form id="Loginform">
                <p class="TextLogin">E-Mail:</p>
            <input class="inputlogin" type='NomeUtente' name='NomeUtente' id="Emailogin" <?php if(isset($_POST["NomeUtente"])){echo "value=".$_POST["NomeUtente"];} ?>> 
            <p class="TextLogin">Password:</p>
            <input class="inputlogin" type='password' name='password' id="PasswordLogin" <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?> > 
             <input id="ButtonLogin" type="button" name="Login" value="Accedi">
            <a id="ButtonRegistrazione"href="registrazione.php">Fai Clic qui per Registrarti</a>
            </form>
           
        </div>
    

    </body>
</html>