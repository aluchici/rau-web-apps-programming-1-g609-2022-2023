class Cont {
    username;
    pw;
    id;

    constructor(a, b) {
        this.username = a;
        this.pw = b;
    }

    thisSetUserId(id) {
        this.id = id;
    }
}

// TODO: Read from file
const LOGINDATA = [
    {
        "username": "Gigelina",
        "pw": 123,
        "id": 1
    }
];

function resetTot() {
    sessionStorage.removeItem("loggedIn");
    /*inca o data, foarte trist. se pare ca doar putem sa stocam stringuri prin sessionstorage, deci nu pot sa folosesc codul acesta. 
    if (sessionStorage.getItem("conturi") != null) sessionStorage.setItem("conturi", LOGINDATA);
    */
   //deci, urmeaza o prostie sa fac parse de string unde am stocat toate conturile noi pana acum... (banuiesc ca nu ar fi trebuit sa fac asta dupa ce invat server-side)
   if (localStorage.getItem("conturi") != null) {
        let contStocat = localStorage.getItem("conturi");
        const cont = JSON.parse(contStocat);
        // parseCont(contStocat);
        console.log(LOGINDATA);
    }
}

function parseCont(contString)  {
    //creeaza un cont nou din primul username si prima parola din contString, il adauga la LOGINDATA, si recursiv cauta urmatorul username si parola cu ce ramane din contString
    var user = "";
    var paro = "";
    if (contString.length == 0) return; //daca nu ramane niciun string sa verifice, s-a terminat ultimul ciclu de recursivitate
    for (let i = 2; i < contString.length; i++) //i=0 este primul spatiu, urmeaza un username, i=1 niciodata o sa fie gol, deci incepem cu i=2
    {
        if (contString[i] == ' ') //al doilea spatiu... urmeaza o parola
        {
            user = contString.substring(1, i); //username incepe la 1, termina la i-1
            for (let j = i+2; j < contString.length; j++) // incep cu i+2 pentru ca mereu o sa fie ceva la i+1, pentru ca parola nu poate fi null
                {
                    if (contString[j] == ' ')  //al treilea spatiu este mereu unde se termina parola
                    {
                        paro = contString.substring(i+1, j); //parola incepe la i+1, termina la j
                        let adaugCont = new Cont(user, paro);
                        LOGINDATA.push(adaugCont);
                        parseCont(contString.substring(j)); //verifica ce ramane din contString
                        break;
                    }
                    if (j == contString.length-1)
                    {
                        paro = contString.substring(i+1);
                        let adaugCont = new Cont(user, paro);
                        LOGINDATA.push(adaugCont);
                        return;
                    }
                }
            break;
        }
    }
}



function verificaLogin() {
    //ar fi bine sa nu fie client-side, dar pana cand invatam server-side, aia e...
    let uinput = document.getElementById("user").value;
    let pinput = document.getElementById("pass").value;
    const user = new Cont(uinput, pinput);

    let gresit = true;
    for (const client of LOGINDATA) {
        if (user.username == client.username && user.pw == client.pw) {
            window.location.href = "home.html";
            user.pw = undefined;
            sessionStorage.setItem("loggedIn", JSON.stringify(user));
            gresit = false;
            break;
        }
    }

    if (gresit == true) {
        alert("Username nu exista sau ati gresit parola.");
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    }
}

function creeazaCont() {
    let username = document.getElementById("creeazauser").value;
    let password = document.getElementById("creeazaparola").value;
    let gasit = false;
    for (const client of LOGINDATA)
    {
        if (username == client.username)
        {
            gasit = true;
            alert("Deja exista un cont cu acest username.");
            document.getElementById("creeazauser").value = "";
            document.getElementById("creeazaparola").value = "";
            return;
        }
    }

    let parolaValida = true;
    for (let i = 0; i < b.length; i++)
    {
        if (password[i]==' ')
        {
            alert("Parola nu poate contine spatii.");
            parolaValida = false;
            document.getElementById("creeazauser").value = "";
            document.getElementById("creeazaparola").value = "";           
            return;
        }
    }

    if (username == "" || password == "")
    {
        alert("Nu putem sa avem campuri goale.");
        document.getElementById("creeazauser").value = "";
        document.getElementById("creeazaparola").value = "";     
        return;      
    }
    if (gasit == false && parolaValida == true)
    {
        const user = new Cont(username, password);
        if (sessionStorage.getItem("conturi") !== "") {
            user.pw = undefined;
            let contStocat = JSON.stringify(user);
            sessionStorage.setItem("conturi", contStocat);
        }
        else
        {
            let contStocat = sessionStorage.getItem("conturi");
            sessionStorage.setItem("conturi", contStocat); 
        }
        window.location.href = "login.html";
    }
}