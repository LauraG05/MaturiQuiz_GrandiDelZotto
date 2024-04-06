
// gestioneViewDomande.js
const back = document.getElementById("back");
const flashcards = document.getElementById("flashcards");
const divDom = document.getElementById("domanda");

let recordPunteggiManches = [];
let numeroDomanda = 0;

export const domandeTot = [
  {
    title: "INFORMATICA",
    quiz: [
      {
        id: 1,
        domanda: "A cosa serve l'asterisco nelle query?",
        risposta: ["Sbagliata", "Sbagliata", "Corretta", "Sbagliata"],
        punteggi: [0, 0, 1, 0]
      },
      {
        id: 2,
        domanda: "Cosa significa INSERT?",
        risposta: ["r1", "r2", "r3", "r4"],
        punteggi: [1, 0, 0, 0]
      },
      {
        id: 3,
        domanda: "AAAAA",
        risposta: ["r1", "r2", "r3", "r4"],
        punteggi: [0, 0, 0, 1]
      },
    ]
  },

  {
    title: "MATEMATICA",
    quiz: [
      {
        id: 1,
        domanda: "La distribuzione binomiale è...",
        risposta: ["r1", "r2", "r3", "r4"],
      },
      {
        id: 2,
        domanda: "La distribuzione binomiale è...",
        risposta: ["r1", "r2", "r3", "r4"],
      },
    ]
  },

  {
    title: "ITALIANO",
    quiz: [
      {
        id: 1,
        domanda: "Dove è nato l'autore Pirandello?",
        risposta: ["r1", "r2", "r3", "r4"],
      },
      {
        id: 2,
        domanda: "Dove è nato l'autore Pirandello?",
        risposta: ["r1", "r2", "r3", "r4"],
      },
    ]
  },

  {
    title: "SISTEMI",
    quiz: [
      {
        id: 1,
        domanda: "L'attacco dell'uomo nel mezzo consiste in...",
        risposta: ["r1", "r2", "r3", "r4"],
      },
      {
        id: 2,
        domanda: "L'attacco dell'uomo nel mezzo consiste in...",
        risposta: ["r1", "r2", "r3", "r4"],
      },
    ]
  }
];

// la risposta è singola e data alla fine insieme alle altre
export const flashCards = [
  {
    title: "INFORMATICA",
    quiz: [
      {
        id: 1,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
      {
        id: 2,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
    ]
  },

  {
    title: "MATEMATICA",
    quiz: [
      {
        id: 1,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
      {
        id: 2,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
    ]
  },

  {
    title: "ITALIANO",
    quiz: [
      {
        id: 1,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
      {
        id: 2,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
    ]
  },

  {
    title: "SISTEMI",
    quiz: [
      {
        id: 1,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
      {
        id: 2,
        domanda: "Domanda a risposta aperta",
        risposta: "risposta",
      },
    ]
  }
];

back.onclick = () => {
  window.location.href = 'sceltaMaterie.html';
  // renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}
/*
flashcards.onclick = () => {
  window.location.href = 'FlashCards.html';
}*/

console.log("DENTRO GESTIONEVIEW");

// pos è quale tra le 4 opzioni è stata scelta, 4 posti dell'array di argomenti
export const renderDomande = (domandeTot, numMateria, numDomanda, divSpecifico) => {
  console.log("renderDOmande in");

  let template = `<div class="container">
      <h1>%MATERIA</h1>
      <br>

      <div class="question-box">
        <div class="question">
          <p style="font-size: 22px;">%DOMANDA</p><br>
          <ol style="font-size: 18px;">
            <li>%OP1</li>
            <li>%OP2</li>
            <li>%OP3</li>
            <li>%OP4</li>
          </ol>
        </div>
      </div>
      <br>
      <div class="options">
        <button id="uno" class="btn btn-secondary b punt">Opzione 1</button>
        <button id="due" class="btn btn-secondary b punt">Opzione 2</button>
        <button id="tre" class="btn btn-secondary b punt">Opzione 3</button>
        <button id="quattro" class="btn btn-secondary b punt">Opzione 4</button>
      </div>
    </div>`;

  let html = "";
  //let domande = response.result;
  //console.log(domande);

  // le domande registrate nell'array (.quiz) sono due, stamperà due box
  let row = template;
  row = row.replace("%MATERIA", domandeTot[0].title);
  row = row.replace("%DOMANDA", domandeTot[numMateria].quiz[numDomanda].domanda);
  row = row.replace("%OP1", domandeTot[numMateria].quiz[numDomanda].risposta[0]);
  row = row.replace("%OP2", domandeTot[numMateria].quiz[numDomanda].risposta[1]);
  row = row.replace("%OP3", domandeTot[numMateria].quiz[numDomanda].risposta[2]);
  row = row.replace("%OP4", domandeTot[numMateria].quiz[numDomanda].risposta[3]);

  html += row;
  divSpecifico.innerHTML = html;

  const buttonRisposte = document.querySelectorAll("button.punt");

  let corretto = false;

  let punteggioTot = 0;
  buttonRisposte.forEach((button) => {
    button.onclick = () => {
      console.log("button: " + button.id);
      for (let i = 0; i < buttonRisposte.length; i++) {
        console.log(domandeTot[numMateria].quiz[numDomanda].punteggi[i]);
        if (domandeTot[numMateria].quiz[numDomanda].punteggi[i] === 1) { // controllo correttezza su array punteggi

          corretto = true;
        } else {
          corretto = false;
        }
      }
      if (corretto) {
        punteggioTot++;
        console.log("punteggio guadagnato: +" + 1);
      } else {
        console.log("risposta sbagliata, punteggio invariato");
      }
      console.log("punteggio totale: " + punteggioTot);
      numDomanda++;
      console.log("Q#" + numDomanda);
      console.log("");

      if (numeroDomanda < domandeTot[0].quiz.length) {
        renderDomande(domandeTot, 0, numDomanda, divDom);
      } else {
        console.log("Tutte le domande sono state risposte");
      }
    };
  });
};

/*
fine.onclick = () => {
  recordPunteggiManches.push(punteggioTot);
}*/

// domanda iniziale
renderDomande(domandeTot, 0, numeroDomanda, divDom);