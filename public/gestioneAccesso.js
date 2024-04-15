const username = document.getElementById("username");
const password = document.getElementById("password");
const conferma = document.getElementById("conferma");

conferma.onclick = () => {
    fetch("../login.php", {
        method: 'POST',
        headers: {'Content-type': ' application/json'},
        body: JSON.stringify({nome: username.value, word: password.value})
    })
        .then(response => response.json())
        .then(response => console.log(response))
}