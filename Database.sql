Create DATABASE hw1;
USE hw1;

CREATE TABLE users (
    id integer primary key auto_increment,
    username varchar(16) not null unique,
    password varchar(255) not null,
    email varchar(255) not null unique,
    name varchar(255) not null,
    surname varchar(255) not null,
    indirizzo varchar(255) not null,
    cap int not null,
    NumeroFisso varchar(15) ,
    Cellulare varchar(15)
) Engine = InnoDB;
CREATE TABLE Prodotti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NomeProdotto VARCHAR(255) NOT NULL,
    Prezzo double NOT NULL,
    PrezzoScontato double,
    Gusto VARCHAR(255),
    Peso varchar(60),    
    Categoria varchar(60),
    NuovoProdotto bool,
    LinkImmagine VARCHAR(1024)
) ENGINE=InnoDB;


CREATE TABLE Carrello (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Cliente INT,
    attivo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (ID_Cliente) REFERENCES users(id)
) ENGINE=InnoDB;
CREATE TABLE ElementiCarrello (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Carrello INT,
    ID_Prodotto INT,
    Quantita INT,
    FOREIGN KEY (ID_Carrello) REFERENCES Carrello(ID),
    FOREIGN KEY (ID_Prodotto) REFERENCES Prodotti(id)
) ENGINE=InnoDB;

CREATE Table ListaDesideri(

ID int AUTO_INCREMENT PRIMARY KEY,
ID_Cliente int,
ID_Prodotto int,
FOREIGN KEY (ID_Cliente) REFERENCES users(id),
FOREIGN KEY (ID_Prodotto) REFERENCES Prodotti(id)
)ENGINE=InnoDB;

CREATE TABLE songs (
    id integer primary key auto_increment,
    user_id integer not null,
    foreign key (user_id) references users(id),
    song_id varchar(255),
    content json
) Engine = InnoDB;  

INSERT INTO Prodotti (NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Whey Protein Isolate', 16, 10.99, "Cioccolato","12gr", "Proteine",false,"risorse\\\prodotti\\\pwp_chocolate_thumb_5983.jpeg");
INSERT INTO Prodotti(NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Whey Protein Isolate', 16, 10.99, "Cioccolato","500gr","Proteine",false ,"risorse\\\prodotti\\\pwi_strawberry_thumb_29a1.jpg");
INSERT INTO Prodotti(NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Whey Protein Isolate', 16, 10.99, "Fragola","500gr","Proteine",false,"risorse\\\prodotti\\\pwi_strawberry_thumb_29a1.jpg");


INSERT INTO Prodotti(NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Barretta proteica MACRO MUNCH™', 16, 10.99, "Fragola","25gr",'Proteine',true ,"risorse\\\prodotti\\\macro_munch_cookies_and_cream_thumb_1_e66e.jpeg");
INSERT INTO Prodotti(NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Barretta proteica MACRO MUNCH™', 16, 10.99, "Fragola","12gr","Proteine",true,"risorse\\\prodotti\\\macro_munch_cookies_and_cream_thumb_1_e66e.jpeg");
INSERT INTO Prodotti (NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Creatina Monoidrata™', 24, 14.99, "Fragola","500gr","Creatina",false ,"risorse\\\prodotti\\\creatine_monohydrate_unflavoured_thumb_1_44a0.jpeg");
INSERT INTO Prodotti (NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Creatina Monoidrata™', 24, 14.99, "Cioccolata","500gr","Creatina",false ,"risorse\\\prodotti\\\creatine_monohydrate_unflavoured_thumb_1_44a0.jpeg");
INSERT INTO Prodotti(NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Peanut Butter™', 25, 16.99, "Fragola","500gr","Proteine",true ,"risorse\\\prodotti\\\peanut_butter_crunchy_1kgeu_bpf_pbut_crun_1000_main_thumbnail_4bd1.jpeg");
INSERT INTO Prodotti (NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Barretta proteica MACRO MUNCH™', 16, 10.99, "Fragola","12gr","Proteine",true ,"risorse\\\prodotti\\\macro_munch_cookies_and_cream_thumb_1_e66e.jpeg");
INSERT INTO Prodotti (NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Creatina™', 24, 14.99, "Fragola","500gr","Creatina",false ,"risorse\\\prodotti\\\creatine_monohydrate_unflavoured_thumb_1_44a0.jpeg");

INSERT INTO Prodotti (NomeProdotto, Prezzo, PrezzoScontato, Gusto,Peso,Categoria,NuovoProdotto,LinkImmagine)
VALUES ('Butter™', 25, 16.99, "Fragola","500gr", "risorse\\\prodotti\\\peanut_butter_crunchy_1kgeu_bpf_pbut_crun_1000_main_thumbnail_4bd1.jpeg");
