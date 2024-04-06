
// sceltaMaterie.js
const informatica = document.getElementById("INFO");
const matematica = document.getElementById("MATE");
const italiano = document.getElementById("ITA");
const sistemi = document.getElementById("SIS");

const back = document.getElementById("back");

informatica.onclick = () => {
  window.location.href = 'informatica.html';
//  console.log("gestione view import");
}

matematica.onclick = () => {
  window.location.href = 'matematica.html';
   //renderDomande(domandeTot, 0, );
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