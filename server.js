const mysql = require("mysql2");
const conf = require("./conf.js");
const connection = mysql.createConnection(conf);
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});


//FUNZIONE PER L'ESECUZIONE DELLE QUERY
const executeQuery = (sql) => {
   return new Promise((resolve, reject) => {      
         connection.query(sql, function (err, result) {
            if (err) {
               console.error(err);
               reject();     
            } 
            console.log('done');
            resolve(result);         
      });
   })
}

// FUNZIONE PER LA LOGIN (RICHIEDE NOME E PASSWORD DAL CLIENT)
const checkLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    const template =" SELECT password FROM utente WHERE nomeutente = '%USERNAME' AND password = '%PASSWORD'";
    const sql = template.replace("%USERNAME", username).replace("%PASSWORD", password);
    executeQuery(sql)
      .then((result) => {
        if (result.length > 0) {
          resolve(true); 
          console.log("LOGIN EFFETTUATO");
        } else {
          resolve(false);
           console.log("CREDENZIALI SBAGLIATE");
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " - " + password);
  checkLogin(username, password)
    .then((result) => {
      if (result === true) {
        res.json({ result: "true" });
      } else {
        res.status(401).json({ result: "false" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: "Internal Server Error" });
    });
});

// FUNZIONI PER LA REGISTRAZIONE (RICHIEDE NOME E PASSWORD DAL CLIENT)
const checkSignIn = (username, password) => {
  return new Promise((resolve, reject) => {
    const template =" SELECT nomeutente FROM utente WHERE nomeutente = '%USERNAME'";
    const sql = template.replace("%USERNAME", username);
    executeQuery(sql)
      .then((result) => {
        if (result.length > 0) {
          resolve(true); 
          console.log("UTENTE GIÀ REGISTRATO");
          console.log("UTENTE GIÀ REGISTRATO");
        } else {
          resolve(false);
           console.log("INSERIMENTO UTENTE NUOVO");
          insert(username, password);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
const insert = (username, password) => {
  return new Promise((resolve, reject) => {
    const template =" INSERT INTO utente (nomeutente, password, rendimento) VALUES ('%USERNAME','%PASSWORD','0.00')";
    const sql = template.replace("%USERNAME", username).replace("%PASSWORD", password);
    executeQuery(sql)
      .then((result) => {
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
  app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " - " + password);
    checkSignIn(username, password);
  });

 //FUNZIONI PER LA CREAZIONE DELLE DOMANDE DA FARE PER IL QUIZ (RICHIEDE LA MATERIA SCELTA DAL CLIENT)
  const selectDomande = (materia) => {
   const template = "SELECT (testo) FROM domande WHERE materia= '%MATERIA'";
  const sql = template.replace("%MATERIA", materia);
   return executeQuery(sql); 
}

app.post("/Domande", (req, res) => {
console.log("carico le domande");
  console.log(req.body.materia);
  selectDomande(req.body.materia).then((response) => {
    let lunghezza= response.length;
    console.log(lunghezza);
    let domande=[];
    for (let i = 0; i < 5; i++) {
       // let indice = Math.floor(Math.random() * lunghezza-1) + 1;
     // console.log(indice);
        //domande[i] = response[indice].testo;
      domande[i] = response[i].testo;
    }
    console.log("passo");
    console.log(domande);
    res.json({ domande: domande});
    console.log(domande);
  })
  .catch((error) => {
    console.log("errore: " + error);
  });
});

//FUNZIONI PER LA CREAZIONE DELLE OPZIONI PER LE DOMANDE ( RICHIEDE DAL CLIENT LE DOMANDE GENERATE PRIMA)
const selectID = (domande)=>{
  let array=[]
   console.log("domande",domande);
   let template = "SELECT id FROM domande WHERE testo = '%DOMANDA'";
   for(let i=0;i<domande.length;i++){
  let sql = template.replace("%DOMANDA", domande[i]);
     executeQuery(sql).then((result)=>{
        array[i]=result;
      }); 
   }
   return array;
}

 const selectOpzioni = (domande) => {
    array=selectID(domande);
    const template = "SELECT testo, CheckSoluzione FROM opzione WHERE domanda = '%DOMANDA'";
    let ar=[]
   for(let i=0;i<array.length;i++){
      let sql = template.replace("%DOMANDA", array[i]);
        executeQuery(sql).then((result)=>{
           
           ar[i]=result;
         }); 
      }
       return ar;
}

app.post("/Opzione", (req, res) => {
console.log("carico le opzioni");
  console.log(req.body.domande);
  res.json(selectOpzioni(req.body.domande));
  
});

//FUNZIONI PER L'AGGIORNAMENTO DEL RENDIMENTO DI UN UTENTE DOPO AVER FINITO IL QUIZ, RICHIEDE DAL CLIENT IL NOME DELL'UTENTE E IL RENDIMENTO (IL PUNTEGGIO) OTTENUTO
const prendiNumeroQuiz=( nome)=>{
    const template = " SELECT CONT(Quiz) FROM risponde WHERE utente = '%USERNAME'";
    const sql = template.replace("%USERNAME", nome);
  executeQuery(sql).then((result)=>{
     return result/10;
   }); 
}

const aggiornaRendimento=(nome,rendimento)=>{
  let numero=prendiNumeroQuiz(nome);
  let template = " SELECT rendimento FROM utente WHERE nomeutente = '%USERNAME'";
  let sql= template.replace("%USERNAME", nome);
  executeQuery(sql).then((result)=>{
  result =result *(numero-1);
  result=result+rendimento;
  result=result/numero;
    return result;
  });
}

const updateRendimento=(nome,rendimento)=>{
  let template = " UPDATE utente SET rendimento = '%RENDIMENTO' WHERE nomeutente = '%USERNAME'";
  let sql= template.replace("%USERNAME", nome).replace("%RENDIMENTO", aggiornaRendimento(nome,rendimento));
  executeQuery(sql).then((result)=>{
    return result;
  });
}

app.post("/AggiornaRendimeto", (req, res) => {
console.log("aggiorno");
  res.json(updateRendimento(req.body.nome,req.body.rendimento));
});

//FUNZIONI PER LA CREAZIONE DEL QUIZ APPENA GENERATE LE DOMANDE DOPO LA SCELTA DELLA MATERIA, RICHIEDE LA MATERIA SCELTA E DATA E ORA CORRENTI (LA DATA INSERITA DAL CLIENT VA SALVATA NELLA CACHE PER DOPO).
const setQuiz=(materia , data)=>{
let template="INSERT INTO quiz (dataora, materia, risultato) VALUES ('%DATA','%MATERIA','0')";
  let sql= template.replace("%DATA", data).replace("%MATERIA", materia);
  executeQuery(sql);
}
app.post("/CreaQuiz", (req, res) => {
console.log("creo");
  setQuiz(req.body.materia, req.body.data);
  res.json("ok");
});

//FUNZIONI PER L'AGGIORNAMENTO DEL QUIZ APPENA FATTO, RICHIEDE IL RISULTATO DEL QUIZ APPENA FATTO E LA DATAORA NELLA CACHE DI QUANDO ABBIAMO CREATO IL QUIZ
const updateQuiz=(id, risultato)=>{
let template="UPDATE Quiz SET risultato = '%RIS' WHERE codiceID = '%ID'";
  let sql= template.replace("%RIS", risultato).replace("%ID", id);
  executeQuery(sql);
}
app.post("/AggiornaQuiz", (req, res) => {
console.log("creo");
  updateQuiz(req.body.materia, req.body.data);
  res.json("ok");
});

// FUNZIONI PER PRENDERE QUIZ, MATERIA E DATA E ORA DI UN UTENTE DOPO TUTTO PER RIVEDERE VECCHI QUIZ RICHIEDE DAL CLIENT IL NOMEUTENTE DALLA CACHE
const pickAllQuiz = (nome) => {
  let array=[];
   let template = "SELECT Quiz FROM risponde WHERE utente = '%NOMEUTENTE'";
  let sql = template.replace("%NOMEUTENTE", nome);
     executeQuery(sql).then((result)=>{
        array=result;
      });
   console.log(array);
    template = "SELECT codiceID, dataora, materia, risultato FROM Quiz WHERE codiceID = '%ID'";
    let ar=[]
   for(let i=0;i<array.length;i++){
      sql = template.replace("%ID", array[i]);
        executeQuery(sql).then((result)=>{
           ar[i]=result;
         }); 
      }
       return ar;
}

app.post("/CaricaVecchiQuiz", (req, res) => {
console.log("carico");
  res.json(pickAllQuiz(req.body.nome));
});

//FUNZIONI PER PRENDERE TUTTO DA UN QUIZ SELEZIONATO PER RIVEDERLO, RICHIEDE L'ID DEL QUIZ PRESO DALLA SELEZIONE QUIZ FATTI IN PRECEDENZA.

//POI QUANDO DOVREMMO STAMPARE IL VECCHIO QUIZ SELEZIONATO STAMPEREMO, NOME, DATA, MATERIA, DOMANDE E SCELTE FATTE E ALLA FINE IL RISULTATO. ABBIAMO GIÀ IL RISULTATO, DATA E MATERIA DEL QUIZ,
const selezionaVecchioQuiz=(id)=>{
const template =  "SELECT d.testo, r.scelta FROM domande d JOIN risponde r WHERE d.id=r.domanda AND r.quiz='%ID'";
  let sql = template.replace("%ID",id);
  executeQuery(sql).then((result)=>{
    return result;
  });
}

app.post("/CaricaDomandeVecchie", (req, res) => {
console.log("carico");
  res.json(selezionaVecchioQuiz(req.body.nome));
});

//FUNZIONI PER LE RISPOSTE DATE DAL CLIENT SUL QUIZ CHE VENGONO CARICATE SUL DB
// IL NOME LO HA GIA DALLA CACHE, LA SCELTA LA PRENDE DALLA SELEZIONE DELL'OPZIONE ( DA 1 A 4) E LA DOMANDA (L'ID ) LO PRENDE DAL CLIENT DA UN ARRAY RESTITUITO DI ID DELLE DOMANDE DEL QUIZ che CARICHI DALLA FUNZIONE SELECTID CHE RICHIAMI. IL QUIZ (L'ID) LO PRENDE DALLA FUNZIONE CARICAIDQUIZ

//FUNZIONE PER CARICARE SUL CLIENT L'ID DELLE DOMANDE DEL QUIZ. I QUALI ANDRANNO IN PARALLELO CON LE DOMANDE E DAI QUALI GESTIREMO L''ATTRIBUTO "scelta" PER IL RISPONDE'
app.post("/caricaIDDomande",(req, res)=>{
  res.json(selectID(req.body.domande));
});
//FUNZIONE PER PRENDERE L'ID QUIZ CON LA MATERIA E LA DATA INSERITA ALL'INIZIO DELLA CREAZIONE DEL QUIZ
const getIdQuiz=(data, materia)=>{
  const template = "SELECT codiceID FROM quiz WHERE dataora = '%DATA' AND materia = '%MATERIA'";
  let sql = template.replace("%DATA",data).replace( "%MATERIA", materia);
  executeQuery(sql).then((result)=>{
    return result;
  });
}
const setRisposta=(data, materia, nome, scelta, domanda)=>{ 
  let quiz=getIdQuiz(data, materia);
const template = "INSERT INTO risponde (scelta, utente, domanda,quiz) VALUES ('%SCELTA','%NOME','%DOMANDA','%QUIZ')";
  let sql = template.replace("%SCELTA",scelta).replace( "%NOME",nome).replace("%DOMANDA",domanda).replace( "%QUIZ",quiz);
  executeQuery(sql);
}

app.post("/Risponde", (req, res) => {
console.log("rispondo");
  setRisposta(req.body.data, req.body.materia, req.body.nome, req.body.scelta, req.body.domanda);
  res.json("ok");
});

