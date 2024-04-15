const domanda = document.getElementById("domanda");
import {render} from '../gestioneViewDomande.php'


window.onload = async() =>{
    let rsp = await fetch("./../../getDomande.php",{
        method: "POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `materia=${encodeURIComponent("INF")}`
    });
    rsp = await rsp.json();

    domanda.innerHTML = rsp;
}