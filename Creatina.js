function onResponse(response)
 {
   return response.json();
 }
    fetch("http://localhost/hw1/GetArticle.php").then(onResponse).then(onArticle);
    function onArticle(json)
    {
        console.log(json);
      for(let prodotto of json) {
        if(prodotto.Categoria==="Creatina")
            {
            let prodottoDiv = document.createElement('div');
            prodottoDiv.className = 'ProdottoArticolo';
            prodottoDiv.dataset.index = prodotto.id;
    
            let imgDiv = document.createElement('div');
            imgDiv.className = 'ImgArticolo';
            imgDiv.dataset.index = prodotto.id;
    
            let img = document.createElement('img');
            img.dataset.index = prodotto.id;
            img.src = prodotto.LinkImmagine;
    
            imgDiv.appendChild(img);
            prodottoDiv.appendChild(imgDiv);
    
            let testoArticolo = document.createElement('div');
            testoArticolo.className = 'TestoArticolo';
    
            let buttonProdotto = document.createElement('div');
            buttonProdotto.className = 'ButtonProdotto';
    
            let gusto = document.createElement('div');
            gusto.className = 'Gusto';
            let gustoText = document.createElement('p');
            gustoText.textContent = `${prodotto.Gusti} Gusti`;
            gusto.appendChild(gustoText);
   
            let buttonPreferito = document.createElement('div');
            buttonPreferito.className = 'ButtonPreferito';
            buttonPreferito.dataset.index = prodotto.id;
            let PreferitoText = document.createElement('p');
            PreferitoText.textContent = 'Aggiungi Preferiti';
            buttonPreferito.appendChild(PreferitoText);
   
            let buttonZoom = document.createElement('div');
            buttonZoom.className = 'ButtonZoom';
            buttonZoom.dataset.index = prodotto.id;
            let zoomText = document.createElement('p');
            zoomText.textContent = 'Zoom';
            buttonZoom.appendChild(zoomText);
    
            buttonProdotto.appendChild(gusto);
            buttonProdotto.appendChild(buttonPreferito);
            buttonProdotto.appendChild(buttonZoom);
    
            let h2 = document.createElement('h2');
            h2.textContent = prodotto.NomeProdotto;
    
            let p = document.createElement('p');
            p.textContent = 'Da';
    
            let costo = document.createElement('div');
            costo.className = 'Costo';
    
            let prezzo = document.createElement('div');
            prezzo.className = 'Prezzo';
            prezzo.dataset.prezzo = prodotto.Prezzo;
            prezzo.textContent = `${prodotto.Prezzo}€`;
    
            let sconto = document.createElement('div');
            sconto.className = 'Sconto';
            sconto.textContent = `->${prodotto.PrezzoScontato}€`;
    
            costo.appendChild(prezzo);
            costo.appendChild(sconto);
    
            testoArticolo.appendChild(buttonProdotto);
            testoArticolo.appendChild(h2);
            testoArticolo.appendChild(p);
            testoArticolo.appendChild(costo);
    
            prodottoDiv.appendChild(testoArticolo);
    
           
            document.getElementById('Articoli').appendChild(prodottoDiv);
            }
        }
        
    }


    function onToken(token)
    {
     ButtonHome(token);
    }
function ButtonHome(token) {
    if (token == 0) {
        var link = document.querySelector('.logo');    // Seleziona l'elemento <a> con classe 'logo'
        link.setAttribute('href', 'index.php'); // Cambia l'attributo href
        var link2 = document.querySelector('.utente'); 
        link2.textContent="";
        link2.setAttribute('href', '');
        var link3 = document.querySelector('.logonazione'); 
        link3.textContent="";
        link3.setAttribute('href', '');
    }
    else {
        var link = document.querySelector('.logo');
        link.setAttribute('href', 'home.php');
        var link2 = document.querySelector('.utente'); 
        link2.textContent="Profile";
        link2.setAttribute('href', 'profile.php');
        var link3 = document.querySelector('.logonazione'); 
        link3.textContent="Logout";
        link3.setAttribute('href', 'logout.php');
    }

    }
    fetch('authjv.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            
        }),
    })
    .then(response => response.text())
    .then(data => onToken(data))
    .catch((error) => {
        console.error('Error:', error);
    });