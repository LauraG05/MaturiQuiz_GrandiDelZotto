
export function registrazione (username, password) {
  fetch('/signup', {
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
      console.log("Utente registrato");
    }
  })
  .catch(error => {
    console.error("Errore durante la registrazione");
  });
}