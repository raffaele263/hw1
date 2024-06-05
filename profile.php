<?php 
    require_once 'auth.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
?>

<html>
    <?php 
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $userid = mysqli_real_escape_string($conn, $userid);
        $query = "SELECT * FROM users WHERE id = $userid";
        $res_1 = mysqli_query($conn, $query);
        $userinfo = mysqli_fetch_assoc($res_1);   
    ?>

    <head>
        <link rel='stylesheet' href='profile.css'>
        <script src='profile.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
    </head>

    <body>
    
    <section id="modalview" class="hidden"> </section>
</div>
        <header>
        <div id ="BarraPrincipale" >
            <div class="logo"></div>
            <div class="Barra"  >
                <div id="iconaBarraweb"><img src="risorse/menu/search_96701.png" ></div>
                <input class="inputcerca" type="text" name="content" id="CercaPrincipale" >
                <div id="ButtonCerca" class="hidden"><p>-></p></div>
            </div>
            <a href='logout.php'class="logonazione" class='button'>LOGOUT</a>
        
            <div class="divisore"></div>
            <a class="utente" href="Home.php">Home</a>
            <div class="carrello" id="buttonCarrello"> </div>
            </div>
            <div id="BarraProdotto">
                <a class="Offerte"></a>
                <a>Proteine</a>
                <a>Creatina</a>
                <a>Vegane</a>
                <a>Vitamine e Minerali</a>
                <a>Alimentazione Sportiva</a>
                <a>Salute E Benessere</a>
                <a>Perdita Peso</a>
                <a>Alimenti</a>
                <a>Accessori & Abbigliamento</a>
                </div>
</div>
        </header>
<section class="container">

    <div class="userInfo">
        <h1>Benvenuto <?php echo $userinfo['name']." ".$userinfo['surname'] ?></h1>
            <div id="VetrinaPreferiti"> 
                <h1> I Preferiti</h1>
                <div id="ArticoliPreferiti"></div>
            </div>
    </div> 
    <div id="PlaylistPreferite">
    <h1>Le Tue Playlist Preferite Durante L'allenamento</h1>
    
    <div id="PreferitiSpotify"> </div>

</div>

<h1 id="CercaSpotify"> Cerca le Tue Playlist Preferite da Inserire sul Profilo </h1>
    <section id="search">
      <form autocomplete="off">
        <div class="search">
          <label for='search'>Cerca</label>
          <input type='text' name="search" class="searchBar">
          <input type="submit" value="Cerca">
        </div>
      </form>
    <div id="results"></div>

    </section>

           
</div>   
            
    </section>

    </body>
</html>

<?php mysqli_close($conn); ?>