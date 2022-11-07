// TODO: change with data from BE (in the future)
const CONTURI = [
    {
        titular: "Nume si Prenume",
        numarCont: "123456567898",
        iban: "GHFXFT354239865498",
        balanta: 354.24,
        moneda: "RON",
        ultimeleTranzactii: [
            {
                data: "2022-10-31",
                suma: 31,
                tip: "plata",
                destinatar: "SC FIRMA SRL"
            }
        ]
    },
    {
        titular: "Nume si Prenume 2",
        numarCont: "1234123567898",
        iban: "GHFXFT3542000865498",
        balanta: 2547.24,
        moneda: "EUR",
        ultimeleTranzactii: [
            {
                data: "2022-10-30",
                suma: 154,
                tip: "incasare",
                destinatar: "SC FIRMA SRL"
            }
        ]
    }
];

const CONT_STYLE = "color: white";

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