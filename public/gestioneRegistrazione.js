const confermaUtente = document.getElementById("SUBMIT");
const back = document.getElementById("back");
const username = document.getElementById("username");
const password = document.getElementById("password");
const procedi = document.getElementById("procedi");

import { registrazione } from './remoto/registrazione.js';

confermaUtente.onclick = async () => {
  registrazione(
    document.getElementById("username").value,
    document.getElementById("password").value
  );
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
};

procedi.onclick = () => {
  window.location.href = 'sceltaMaterie.html';
}

back.onclick = () => {
  window.location.href = 'index.html';
}
