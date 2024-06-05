//#region FunctionArticoliPreferiti
function onArticle(json)
 {
  console.log(json.length);
  if((json.length)==0)
    {
    
      document.getElementById("VetrinaPreferiti").style.display="none";
    }
    else
    {
    document.getElementById("VetrinaPreferiti").style.display="Flex";
      for(let prodotto of json) {
        let prodottoDiv = document.createElement('div');
        prodottoDiv.className = 'ProdottoArticoloInfo';
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

 
        let buttonPreferito = document.createElement('div');
        buttonPreferito.className = 'ButtonPreferito';
        buttonPreferito.dataset.index = prodotto.id;
        let PreferitoText = document.createElement('p');
        PreferitoText.textContent = 'Elimina Preferito';
        buttonPreferito.appendChild(PreferitoText);

        let buttonZoom = document.createElement('div');
        buttonZoom.className = 'ButtonZoom';
        buttonZoom.dataset.index = prodotto.id;
        let zoomText = document.createElement('p');
        zoomText.textContent = 'Zoom';
        buttonZoom.appendChild(zoomText);

      
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

        // Aggiungi l'elemento al div appropriato in base al valore di 'Nuovo Prodotto'
     
            document.getElementById('ArticoliPreferiti').appendChild(prodottoDiv);
    }
    AddButton();
    }
   
 }
 function onResponse(response)
 {
   return response.json();
 }

 fetch("http://localhost/hw1/GetListaDesideri.php").then(onResponse).then(onArticle);


 function onModalClick() {
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');
    modalView.innerHTML = '';
}

const modalView = document.querySelector('#modalview');
modalView.addEventListener('click', onModalClick);



function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    return image;
}

function onThumbnailClick(event) {
    const Button = event.currentTarget;
    const Prodotto = document.querySelectorAll("img" + "[data-index='" + Button.dataset.index + "']");
    const image = createImage(Prodotto[0].src);
    document.body.classList.add('no-scroll');
    modalView.appendChild(image);
    modalView.classList.remove('hidden');
    modalview.style.left = window.pageXOffset ;
    modalview.style.top = window.pageYOffset ;

}



function AddButton()
{
 const imgbuttonzoom = document.querySelectorAll(".ProdottoArticoloInfo .TestoArticolo .ButtonProdotto .ButtonZoom");
for (let i = 0; i < imgbuttonzoom.length; i++) {
 imgbuttonzoom[i].addEventListener("click", onThumbnailClick);
}
const imgbuttonpreferito = document.querySelectorAll(".ProdottoArticoloInfo .TestoArticolo .ButtonProdotto .ButtonPreferito");
for (let i = 0; i < imgbuttonpreferito.length; i++) {
 imgbuttonpreferito[i].addEventListener("click", EliminaPreferito);
 }
 
}

function EliminaPreferito(event)
{
  let data = new URLSearchParams();
  data.append('IdProdotto', event.currentTarget.dataset.index);
  
  fetch('DeletePreferiti.php', {
      method: 'POST',
      body: data
  })
  .then(response => response.text())
  .then(response => console.log(response))
  .catch((error) => console.error('Error:', error));
  const divelement = document.getElementById('ArticoliPreferiti');
  divelement.innerHTML = '';
  while (divelement.firstChild) 
    {
      divelement.removeChild(divelement.firstChild);
    }
    fetch("http://localhost/hw1/GetListaDesideri.php").then(onResponse).then(onArticle);
}

//#endregion

 //#region FunctionCarrello

 

 const divelement=document.createElement('div');
 divelement.classList.add('contenitoreelementicarrello');
 divelement.id="Carrello";
 function CaricanelCarrello(event) 
 {
   const ind = event.currentTarget.dataset.index;
   AddElementOnCarrelloDatabase(ind);
   while (divelement.firstChild) 
   {
     divelement.removeChild(divelement.firstChild);
   }
   GETCarrello();
 }
 
 function AddElementOnCarrelloDatabase(Prodotto)
 {
   let data = new URLSearchParams();
   data.append('IdProdotto', Prodotto);
   
   fetch('AddOnCarrello.php', {
       method: 'POST',
       body: data
   })
   .then(response => response.text())
   .then(response => console.log(response))
   .catch((error) => console.error('Error:', error));
 }
 let CostoCarrello=0;
 function GETCarrello()
 {
   fetch("http://localhost/hw1/GetCarrello.php").then(onResponse).then(OnCarrello);
 }
 let numitems = 0;
 function OnCarrello(json)
 {
   numitems=0;
 let Carrello=document.childElementCount
 CostoCarrello=0;
 console.log(json);
 
 for(let prodotto of json)
   {
     numitems++;
  
 addelementcheckout(prodotto.LinkImmagine,(Number)(prodotto.Prezzo),prodotto.NomeProdotto,"Quantità:"+prodotto.Quantita,prodotto.Peso);
 if(numitems===((prodotto.Righe)))
   {
     CostoCarrello+=(Number)(prodotto.PrezzoTotale);
   }
 
      
    
   }
 }
 
 GETCarrello();
 
 
 
 function CreateModalCarrello()
 {
   const carrelloLaterale = document.createElement('div');
   carrelloLaterale.classList.add('CarelloLaterale');
   const TextCarello = document.createElement('div');
   const textel = document.createElement('p');
   textel.textContent = "Il Mio Carrello è:" + "   " + "(" + numitems + "  items)";
   TextCarello.appendChild(textel);
   TextCarello.classList.add('TextCarrello');
   const containerprez = document.createElement('div');
   containerprez.classList.add("containerprez");
   const PrezzoCarrello = document.createElement('div');
   PrezzoCarrello.classList.add('PrezzoCarrello');
   let TextPrezzo = document.createElement('p');
   TextPrezzo.textContent = "Il Prezzo Del Carrello è:";
   let TextPrezzo2 = document.createElement('p');
   TextPrezzo2.textContent = CostoCarrello.toFixed(2) + "€";
   TextPrezzo2.id="Costo";
   let TextButton = document.createElement('a');
   TextButton.classList.add("ButtonPaga");
   TextButton.textContent = "Visualizza Carrello";
   PrezzoCarrello.appendChild(TextPrezzo);
   PrezzoCarrello.appendChild(TextPrezzo2);
   PrezzoCarrello.appendChild(TextButton);
   containerprez.appendChild(PrezzoCarrello);
   carrelloLaterale.appendChild(TextCarello);
   carrelloLaterale.appendChild(divelement);
 
   carrelloLaterale.appendChild(containerprez);
   document.body.classList.add('no-scroll');
   modalView.appendChild(carrelloLaterale);
   modalView.classList.remove('hidden');
   modalview.style.left = window.pageXOffset ;
   modalview.style.top = window.pageYOffset ;
 }
 
 
 function addelementcheckout(immagine,prezzo,nomearticolo,tipologia,PesoProdotto)
 {
   const container=document.createElement('div');
   container.classList.add("ProdottoCheckout");
 const image=createImage(immagine);
 image.classList.add("ProdottoCheckoutImage")
  
  const nomearticoloa=document.createElement('p');
  nomearticoloa.classList.add("ProdottoCheckoutNome");
  nomearticoloa.textContent=nomearticolo;
  const prezzodiv=document.createElement('p');
  prezzodiv.classList.add("ProdottoCheckoutPrezzo");
  prezzodiv.textContent="Il Prezzo è:"+prezzo+"€";
  const Tipologiaa=document.createElement('p');
  Tipologiaa.classList.add("ProdottoCheckoutTipogia");
  const Peso=document.createElement('p');
  Peso.classList.add("ProdottoCheckoutTipogia");
  const containerCheckout=document.createElement('div');
  containerCheckout.classList.add("ProdottoCheckoutContainer")
  Tipologiaa.textContent=tipologia;
  Peso.textContent=PesoProdotto;
 container.appendChild(image);
 
 containerCheckout.appendChild(nomearticoloa);
 containerCheckout.appendChild(prezzodiv);
 containerCheckout.appendChild(Tipologiaa);
 containerCheckout.appendChild(Peso);
 container.appendChild(containerCheckout);
 divelement.appendChild(container);
 }
 document.getElementById("buttonCarrello").addEventListener("click", CreateModalCarrello);
 
 
  //#endregion 




//#region FunctionSpotify
function closeModal(event){
  console.log("Close modal");
  event.currentTarget.classList.add("hidden");
  const card = document.querySelector('.selected');
  card.classList.remove("selected");
  card.classList.remove("unselected");
  card.querySelector('img').classList.remove("img-selected");
  card.querySelector('.canzoneInfo').classList.remove("show");
  card.querySelector('.infoContainer').classList.remove("infoSelected");
  const form = card.querySelector('.saveForm');
  form.classList.remove("hidden");  
  modalView.removeEventListener("click",closeModal);
  modalView.addEventListener("click",onModalClick);
}


function resizeSong(event){  
  console.log("Resize song");
  const track = event.currentTarget;

  if (!event.currentTarget.classList.contains("selected")){
    modalView.classList.remove("hidden");
    modalView.removeEventListener("click",onModalClick);
    modalView.addEventListener("click",closeModal);
    modalView.style.left = window.pageXOffset - 8 + "px";
    modalView.style.top = window.pageYOffset - 8 + "px";

  event.currentTarget.classList.remove("unselected");
  event.currentTarget.classList.add("selected");
  event.currentTarget.querySelector('img').classList.add("img-selected"); 
  event.currentTarget.querySelector('.canzoneInfo').classList.add("show");
  event.currentTarget.querySelector('.infoContainer').classList.add("infoSelected");


  const form = event.currentTarget.querySelector('.saveForm');
  form.classList.add("hidden");

} else {
  console.log('already selected');
}
}
document.querySelector("#search form").addEventListener("submit", search);
  function jsonSpotify(json) {

    console.log(json);
    const container = document.getElementById('results');
    container.innerHTML = '';
    container.className = 'spotify';
    if (!json.tracks.items.length) {noResults(); return;}
    
    for (let track in json.tracks.items) {
        const card = document.createElement('div');
        card.dataset.id = json.tracks.items[track].id;
        card.dataset.title = json.tracks.items[track].name;
        card.dataset.artist = json.tracks.items[track].artists[0].name;
        card.dataset.duration = json.tracks.items[track].duration_ms;
        card.dataset.popularity = json.tracks.items[track].popularity;
        card.dataset.image = json.tracks.items[track].album.images[0].url;
        card.classList.add('track');
        

        const trackInfo = document.createElement('div');
        trackInfo.classList.add('trackInfo');
        card.appendChild(trackInfo);

        const img = document.createElement('img');
        img.src = json.tracks.items[track].album.images[0].url;
        trackInfo.appendChild(img);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        trackInfo.appendChild(infoContainer);

        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);

        const name = document.createElement('strong');
        name.innerHTML = json.tracks.items[track].name;
        info.appendChild(name);

        const artist = document.createElement('a');
        artist.innerHTML = json.tracks.items[track].artists[0].name;
        info.appendChild(artist);

        const saveForm = document.createElement('div');
        saveForm.classList.add("saveForm");
        card.appendChild(saveForm);
        const save = document.createElement('div');
        save.value='';
        save.classList.add("save");
        saveForm.appendChild(save);
        //saveForm.addEventListener('submit', saveSong);
        saveForm.addEventListener('click',saveSong );

        // info sulle canzoni quando selected
        const canzoneInfo= document.createElement('div');
        canzoneInfo.classList.add("canzoneInfo");
        const popularity = document.createElement('p');
        popularity.innerHTML = 'Popolarità: '+json.tracks.items[track].popularity;
        canzoneInfo.appendChild(popularity);
        const date = document.createElement('p');
        date.innerHTML = 'Data di pubblicazione: '+json.tracks.items[track].album.release_date;
        canzoneInfo.appendChild(date);
        const duration = document.createElement('p');
        const durationMs = json.tracks.items[track].duration_ms;
        const durationMin  = durationMs / 1000 / 60;
        const intPart = parseInt(durationMin, 10);
        const decimalPart = durationMin - intPart;
        const decimalPartRounded =  Math.floor(decimalPart * 100) / 100;
        const trackSec = parseInt((decimalPartRounded * 60), 10);
        duration.classList.add("duration");
        duration.innerHTML = "Durata: "+intPart+" min "+trackSec+" sec";
        canzoneInfo.appendChild(duration);
        card.appendChild(canzoneInfo);


        card.classList.add("unselected");

        card.addEventListener('click', resizeSong);

        container.appendChild(card);
        }
}

function noResults() {

  const container = document.getElementById('results');
  container.innerHTML = '';
  const nores = document.createElement('div');
  nores.className = "loading";
  nores.textContent = "Nessun risultato.";
  container.appendChild(nores);
}


function search(event){
    const form_data = new FormData(document.querySelector("#search form"));
    fetch("search_content.php?q="+encodeURIComponent(form_data.get('search'))).then(searchResponse).then(jsonSpotify);
    event.preventDefault();
}

function searchResponse(response){
    console.log(response);
    return response.json();
}


function saveSong(event){
  console.log("Salvataggio")
  const card = event.currentTarget.parentNode;
  const formData = new FormData();
  formData.append('id', card.dataset.id);
  formData.append('title', card.dataset.title);
  formData.append('artist', card.dataset.artist);
  formData.append('duration', card.dataset.duration);
  formData.append('popularity', card.dataset.popularity);
  formData.append('image', card.dataset.image);
  fetch("save_song.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
  fetchSongs();
  event.stopPropagation();
}

function dispatchResponse(response) {

  console.log(response);
  return response.json().then(databaseResponse); 
}

function dispatchError(error) { 
  console.log("Errore");
}

function databaseResponse(json) {
  if (!json.ok) {
      dispatchError();
      return null;
  }

}

function fetchSongs() {
        fetch("fetch_song.php").then(fetchResponse).then(fetchSongsJson);
}


function fetchResponse(response) {
    if (!response.ok) {return null};
    return response.json();
}

function fetchSongsJson(json) {
    console.log("Fetching...");
    console.log(json);
    if (!json.length) {noResults(); return;}
    
    const container = document.getElementById('PreferitiSpotify');
    container.innerHTML = '';
    container.className = 'spotify';

    for (let track in json) {
        const card = document.createElement('div');
        card.dataset.id = json[track].content.id;
        card.classList.add('track');
        const tracks = document.querySelectorAll(".track")
        const trackInfo = document.createElement('div');
        trackInfo.classList.add('trackInfo');
        card.appendChild(trackInfo);
        const img = document.createElement('img');
        img.src = json[track].content.image;
        trackInfo.appendChild(img);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        trackInfo.appendChild(infoContainer);
        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);
        const name = document.createElement('strong');
        name.innerHTML = json[track].content.title;
        info.appendChild(name);
        const artist = document.createElement('a');
        artist.innerHTML = json[track].content.artist;
        info.appendChild(artist);
        container.appendChild(card);
        }
}

function noResults() {
    const container = document.getElementById('PreferitiSpotify');
    container.innerHTML = '';
    const nores = document.createElement('div');
    nores.className = "nores";
    nores.textContent = "Nessun risultato.";
    container.appendChild(nores);
  }



fetchSongs();

//#endregion