



const buttonmenu = document.querySelector("#buttonmenu img");
buttonmenu.addEventListener("click", OpenMenu);

function OpenMenu(event) {
    console.log("ciao");
    const Menumobile = document.querySelector('#hiddenmenumobile');
    Menumobile.classList.remove('hidden');
    document.body.classList.add('no-scroll');

}
const buttonclosemenumobile = document.querySelector('#buttonclosemenumobile');
buttonclosemenumobile.addEventListener("click", CloseMenu);
function CloseMenu(event) {
    const Menumobile = document.querySelector('#hiddenmenumobile');
    Menumobile.classList.add('hidden');
}

//#region Banner

const textBannerHidden = document.querySelector("#Banner #text2");
textBannerHidden.classList.add("textnone");
textBannerHidden.classList.remove("texthidden");

const Banner = document.querySelector('#Banner');
Banner.addEventListener("click", CambioimmBanner);
const imgBanner = document.querySelector("#ImgBanner");
imgBanner.classList.remove("hiddenimgbanner");
imgBanner.classList.add("imgbannerprinc");

function CambioimmBanner() {   
    const imgBanner = document.querySelector("#ImgBanner");
    const textBannerprinc = document.querySelector("#Banner #text");
    const textBannerHidden = document.querySelector("#Banner #text2");
    if (imgBanner.classList == 'hiddenimgbanner') {
        imgBanner.classList.add("imgbannerprinc");
        imgBanner.classList.remove("hiddenimgbanner");
        textBannerprinc.classList.add("textprincipal");
        textBannerprinc.classList.remove("textnone")
        textBannerHidden.classList.remove("texthidden");
        textBannerHidden.classList.add("textnone");
    }
    else {                                                      /* Funzione Per il Cambio Immagine Nell'Banner*/
        imgBanner.classList.add("hiddenimgbanner");
        textBannerprinc.classList.remove("textprincipal");
        textBannerprinc.classList.add("textnone")
        textBannerHidden.classList.add("texthidden");
        textBannerHidden.classList.remove("textnone");
        imgBanner.classList.remove("imgbannerprinc");
    }
    const ButtonBannerPrincipal = document.querySelector("#Banner .ButtonPrincipal");
    ButtonBannerPrincipal.addEventListener("click", ButtonBanPrincipal, { capture: false});
    function ButtonBanPrincipal(event) 
    { 
        event.stopImmediatePropagation();
        window.alert("Presto Disponibile,Principal");    /* Funzione Per il Button Principale nell'Banner*/
        console.log("principal");
    }
    const ButtonBannerHidden = document.querySelector("#Banner .ButtonHidden");
    ButtonBannerHidden.addEventListener("click", ButtonBanHidden,{ capture: false});
    function ButtonBanHidden(event) 
    {
        event.stopImmediatePropagation();
        window.alert("Presto Disponibile,Hidden");            /* Funzione Per il Button Secondario nell'Banner*/                                         
        console.log('Cliccato interno,Hidden!');
    }
}

//#endregion

//#region CercaPrincipale
document.getElementById("CercaPrincipale").addEventListener("focusout", focusOutCercaPrincipale);
document.getElementById("CercaPrincipale").value="Cosa Vuoi Cercare?";
function focusOutCercaPrincipale(event)
{
if(document.getElementById("CercaPrincipale").value===""||document.getElementById("CercaPrincipale").value==="Cosa Vuoi Cercare?")
    {
        document.getElementById("ButtonCerca").classList.add("hidden");
        document.getElementById("CercaPrincipale").value="Cosa Vuoi Cercare?";
    }
}

document.getElementById("CercaPrincipale").addEventListener("click", ClickCercaPrincipale);
document.getElementById("ButtonCerca").classList.add("hidden");
function ClickCercaPrincipale(event)
{
    document.getElementById("ButtonCerca").classList.remove("hidden");
    document.getElementById("CercaPrincipale").value="";
}
document.getElementById("ButtonCerca").addEventListener("click",ClickButtonCerca);
function ClickButtonCerca(event)
{
    let valoreCerca=document.getElementById("CercaPrincipale").value;
    console.log(valoreCerca);
    document.getElementById("CercaPrincipale").value="Cosa Vuoi Cercare?";
    document.getElementById("ButtonCerca").classList.add("hidden");
}

//#endregion

//#region Newsletter


document.getElementById("Email").addEventListener("focusout", focusoutNewsletterEmail);
document.getElementById("Email").value="Inserisci La Tua E-mail";
function focusoutNewsletterEmail()
{
    if(document.getElementById("Email").value==="")
        { 
            document.getElementById("Email").value="Inserisci La Tua E-mail"
        }
        else EMAILCHECK=document.getElementById("Email").value;
}

document.getElementById("Email").addEventListener("click",clicknewsletteremail);

function clicknewsletteremail(event)
{
    EMAILCHECK="";
document.getElementById("Email").value=null;
}
           
document.getElementById("buttonnewsletter").addEventListener("click",buttonnewsletter)
const Key_abstract="";
function buttonnewsletter()
{
EMAILCHECK=document.getElementById("Email").value;
console.log(EMAILCHECK);
let responsejson;
const options = {method: 'GET'};
fetch("https://emailvalidation.abstractapi.com/v1/?api_key="+Key_abstract+"&email=" + EMAILCHECK , options)
  .then(response => response.json())
  .then(response => onJsonCerca(response))
  .catch(err => console.error(err));
  document.getElementById("Email").value="Inserisci La Tua E-mail";
}
function onJsonCerca(json)
{
    let Deliverable = json.deliverability;
   if(Deliverable==="DELIVERABLE")
    {
        window.alert("E-mail Corretta");
    }
    else
    {
        window.alert("E-mail Sbagliata");
    }
}
//#endregion

//#region modalClickZoom
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
    modalview.style.left = window.pageXOffset - 8 + "px";
    modalview.style.top = window.pageYOffset - 8 + "px";

}

//#endregion

//#region ButtonCompraVetrine


document.getElementById("ButtonCompraVet1").addEventListener("click",ButtonCompraVet2);
function ButtonCompraVet1(event)
{
window.alert("Articolo Non Disponibile:1");
}

document.getElementById("ButtonCompraVet2").addEventListener("click",ButtonCompraVet2);
function ButtonCompraVet2(event)
{
window.alert("Articolo Non Disponibile:2");
}

//#endregion

//#region  SelezioneProdotti

function ProdottiImgReindirizzamento(event)
{
  window.alert("Devi Loggarti Prima di Poter Inserire Articoli nel Carrello");
}
//#endregion SelezioneProdotti



 //#region ModalCarrello
 





 const divelement=document.createElement('div');
divelement.classList.add('contenitoreelementicarrello');
let CostoCarrello=0;
function CreateModalCarrello()
{
 
  let numitems = 0;
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
  TextPrezzo2.textContent = CostoCarrello + "€";
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
let somma = Number(CostoCarrello) + Number(prezzo);
CostoCarrello=somma;
containerCheckout.appendChild(nomearticoloa);
containerCheckout.appendChild(prezzodiv);
containerCheckout.appendChild(Tipologiaa);
containerCheckout.appendChild(Peso);
container.appendChild(containerCheckout);
divelement.appendChild(container);
}
document.getElementById("buttonCarrello").addEventListener("click", CreateModalCarrello);


 //#endregion 

 function onArticle(json)
 {
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
 
         let gusto = document.createElement('div');
         gusto.className = 'Gusto';
         let gustoText = document.createElement('p');
         gustoText.textContent = `${prodotto.Gusti} Gusti`;
         gusto.appendChild(gustoText);

         let buttonZoom = document.createElement('div');
         buttonZoom.className = 'ButtonZoom';
         buttonZoom.dataset.index = prodotto.id;
         let zoomText = document.createElement('p');
         zoomText.textContent = 'Zoom';
         buttonZoom.appendChild(zoomText);
 
         buttonProdotto.appendChild(gusto);
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
         if(prodotto['NuovoProdotto']==true) {
                     document.querySelector('.ProdottiArticoli').appendChild(prodottoDiv);
         } else {
             document.getElementById('ArticoliPreferiti').appendChild(prodottoDiv);
         }
     }
     AddButton();
 }
 
 function AddButton()
 {
  const Preferitiimgbutton = document.querySelectorAll(".ProdottoArticoloInfo .TestoArticolo .ButtonProdotto .ButtonZoom");
for (let i = 0; i < Preferitiimgbutton.length; i++) {
    Preferitiimgbutton[i].addEventListener("click", onThumbnailClick);
 }
 const ProdottiImg  = document.querySelectorAll(".ProdottoArticoloInfo .ImgArticolo");
for (let i = 0; i < ProdottiImg.length; i++)
{
    ProdottiImg[i].addEventListener("click", ProdottiImgReindirizzamento);
}
 
}
 function onResponse(response)
 {
   return response.json();
 }
    
 
 
 fetch("http://localhost/hw1/GetArticle.php").then(onResponse).then(onArticle);
 