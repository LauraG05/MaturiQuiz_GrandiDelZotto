const signUp = (user, pass) => {
  fetch("/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: user, password: pass }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.result === "Success") {
        sessionStorage.setItem("username", user);
        sessionStorage.setItem("password", pass);
        window.location.href = "public/login.html";
      } else {
        alert("Registration fallita.");
      }
    })
    .catch((error) => {
      console.error("Errore: ", error);
    });
};
