export function accesso (username, password) {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (data.result === "true") {
      console.log("Eseguito il login");
     // reindirizzamento ??
    } else {
      throw new Error('Credenziali non valide');
    }
  })
  .catch(error => {
    console.error("Errore durante il login");
  });
}