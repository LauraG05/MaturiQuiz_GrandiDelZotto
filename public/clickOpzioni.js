
const buttonRisposte = document.querySelectorAll("button.punt");

let corretto = false;

let punteggioTot = 0;
buttonRisposte.forEach((button) => {
    button.onclick = () => {
        console.log("button: " + button.id);
        for (let i = 0; i < buttonRisposte.length; i++) {
            console.log(domandeTot[numMateria].quiz[numDomanda].punteggi[i]);
            if (domandeTot[numMateria].quiz[numDomanda].punteggi[i] === 1) {
                // controllo correttezza su array punteggi

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

