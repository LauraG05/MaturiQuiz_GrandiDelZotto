const confermaUtente = document.getElementById("SUBMIT");
const back = document.getElementById("back");
const username = document.getElementById("username");
const password = document.getElementById("password");

import { accesso } from './remoto/accesso.js';

confermaUtente.onclick = async() => {
  await accesso(
    document.getElementById("username").value,
    document.getElementById("password").value
    //console.log("funzia?");
  );
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  //window.location.href = 'sceltaMaterie.html';
};

back.onclick = () => {
  window.location.href = 'index.html';
}
