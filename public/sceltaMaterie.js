const informatica = document.getElementById("INFO");
const matematica = document.getElementById("MATE");
const italiano = document.getElementById("ITA");
const sistemi = document.getElementById("SIS");

const back = document.getElementById("back");

const domandeTot = [
  {
    title: "INFORMATICA",
    quiz: [
      {
        id: 1,
        domanda: "A cosa serve l'asterisco nelle query?",
        risposta: ["r1", "r2", "r3", "r4"],
      },
      {
        id: 2,
        domanda: "A cosa serve l'asterisco nelle query?",
        risposta: ["r1", "r2", "r3", "r4"],
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
const flashCards = [
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

// pos è quale tra le 4 opzioni è stata scelta, 4 posti dell'array di argomenti
const renderDomande = (domandeTot, pos, divSpecifico) => {
  let template = `
  <br><br>
  <h1>%TITOLO</h1>
      <h5>Domanda %num </h5>
      <p>%DOMANDA</p>
     <div class="form-check">
        <input class="form-check-input input" type="checkbox" value="1" id="flexCheckDefault1">
          <label class="form-check-label" for="flexCheckDefault">
            %RISP1
          </label>
          </input>
   </div>

          <div class="form-check">
           <input class="form-check-input input" type="checkbox" value="2" id="flexCheckDefault2">
          <label class="form-check-label" for="flexCheckDefault">
            %RISP2
          </label>
           </input>
   </div>

           <div class="form-check">
           <input class="form-check-input input" type="checkbox" value="3" id="flexCheckDefault3">
          <label class="form-check-label" for="flexCheckDefault">
            %RISP3
          </label>
           </input>
   </div>

           <div class="form-check">
           <input class="form-check-input input " type="checkbox" value="4" id="flexCheckDefault4">
          <label class="form-check-label" for="flexCheckDefault">
            %RISP4
          </label>
           </input>
     </div>
  `;
  let html = "";
  //let domande = response.result;
  //console.log(domande);
  /*domandeTot[pos].quiz.forEach((element) => {
    let row = template;
    row = row.replace("%TITOLO", element.title);
    row = row.replace("%num", element.id);
    row = row.replace("%DOMANDA", element.domanda);
    row = row.replace("%RISP1", element.risposta[0]);
    row = row.replace("%RISP2", element.risposta[1]);
    row = row.replace("%RISP3", element.risposta[2]);
    row = row.replace("%RISP4", element.risposta[3]);
    html += row;
  });
  html += `<br><button id="fineQuiz" type="submit" class="btn btn-primary">
    Submit 
  </button>`;*/
  html += "aaaaaaaaaaaaaa";
  divSpecifico.innerHTML = html;
  console.log(divSpecifico);
};

informatica.onclick = () => {
  window.location.href = 'informatica.html';
  //  renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}

matematica.onclick = () => {
  window.location.href = 'matematica.html';
  // renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}

italiano.onclick = () => {
  window.location.href = 'italiano.html';
  //  renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}

sistemi.onclick = () => {
  window.location.href = 'sistemi.html';
  // renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}

back.onclick = () => {
  window.location.href = 'login.html';
  // renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}
