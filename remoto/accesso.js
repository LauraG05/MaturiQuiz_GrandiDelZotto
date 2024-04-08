export function accesso (user, pass) {
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      username: user,
      password: pass,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.result !== "Unauthorized") {
        sessionStorage.setItem("username", user);
        sessionStorage.setItem("password", pass);
        window.location.href = "public/login.html";
      } 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
