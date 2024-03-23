const accedi = document.getElementById("ACCESSO");
const registrati = document.getElementById("REGISTRAZIONE");

accedi.onclick = () => {
  window.location.href = 'login.html';
}

registrati.onclick = () => {
  window.location.href = 'login.html';
}


// Gestione DB
/* servizio ottenere domande lato server
app.get("/questions", (req, res) => {
  res.json({ result: domande });
  //console.log("ciao");
});

const insertRisposta = (quiz) => {
  const template = `
INSERT INTO Risposta (contenuto) VALUES ('$RISPOSTA')
`;
  let sql = template.replace("$RISPOSTA", quiz.questions.answer);
  return executeQuery(sql);
};

const ottieniDomanda = (quiz) => {
  const template = `
SELECT * FROM Domanda WHERE id = $ID
`;
  let sql = template.replace("$ID", quiz.questions.id);
  return executeQuery(sql);
}
// funzione lato server per aggiungere domande all'array

*/