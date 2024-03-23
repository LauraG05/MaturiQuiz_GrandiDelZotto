const back = document.getElementById("back");
const flashcards = document.getElementById("flashcards");

back.onclick = () => {
  window.location.href = 'sceltaMaterie.html';
  // renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}

flashcards.onclick = () => {
  window.location.href = 'FlashCards.html';
  // renderDomande(domandeTot, 0, document.getElementById("infoDomande"));
}

