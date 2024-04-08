const confermaUtente = document.getElementById("SUBMIT");
const back = document.getElementById("back");
const username = document.getElementById("username");
const password = document.getElementById("password");
const procedi = document.getElementById("procedi");
/*
import {registrazione} from './registrazione.js';

confermaUtente.onclick = () => {
  registrazione(
    document.getElementById("username").value,
    document.getElementById("password").value
    //console.log("funzia?");
  );
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
};
*/
procedi.onclick = () =>{
  window.location.href = 'sceltaMaterie.html';
}

back.onclick = () => {
  window.location.href = 'index.html';
}
