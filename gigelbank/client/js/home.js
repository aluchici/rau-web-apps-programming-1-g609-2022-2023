// TODO: change with data from BE (in the future)
const CONT_STYLE = "color: white";
const CONTURI = [];

const accountSection = document.getElementById("main-section");
for (const cont of CONTURI) {
    const div = document.createElement("div");
    const titular = document.createElement("p");
    titular.innerText = `TITULAR: ${cont.titular}`;
    titular.style = CONT_STYLE;
    div.appendChild(titular);

    const numarCont = document.createElement("p");
    numarCont.innerText = `NR CONT ${cont.numarCont}`;
    numarCont.style = CONT_STYLE;
    div.appendChild(numarCont);

    const balanta = document.createElement("p");
    balanta.innerText = `BALANTA ${cont.balanta}`;
    balanta.style = CONT_STYLE;
    div.appendChild(balanta);

    const br = document.createElement("br");
    div.appendChild(br);
    
    accountSection.appendChild(div);
}