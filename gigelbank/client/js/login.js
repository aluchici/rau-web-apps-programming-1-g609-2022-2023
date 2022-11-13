//Antonio Balasa, Hanna Chung - am facut pentru login si redirectionare la cont respectiv al utilizatorului

const LOGINDATA = [
    {
        username: "Antonio",
        pw: "balasa"
    },
    {
        username: "Gigelina",
        pw: "123"

    },
    {
        username: "MosCraciun",
        pw: "25dec"
    },
    {
        username: "OmulPesterii",
        pw: "oogabooga"
    }
];

class cont
{
    username;
    pw;
    constructor(a, b){
        this.username = a;
        this.pw = b;
    }
}

function resetTot()
{
    sessionStorage.setItem("loggedIn", "");
    /*inca o data, foarte trist. se pare ca doar putem sa stocam stringuri prin sessionstorage, deci nu pot sa folosesc codul acesta. 
    if (sessionStorage.getItem("conturi") != null) sessionStorage.setItem("conturi", LOGINDATA);
    */
   //deci, urmeaza o prostie sa fac parse de string unde am stocat toate conturile noi pana acum... (banuiesc ca nu ar fi trebuit sa fac asta dupa ce invat server-side)
   if (localStorage.getItem("conturi") != null)
   {
        
        let contStocat = localStorage.getItem("conturi");
        parseCont(contStocat);
        console.log(LOGINDATA);
    }
}

function parseCont(contString) //creeaza un cont nou din primul username si prima parola din contString, il adauga la LOGINDATA, si recursiv cauta urmatorul username si parola cu ce ramane din contString
{
    var user="";
    var paro="";
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
                        let adaugCont = new cont(user, paro);
                        LOGINDATA.push(adaugCont);
                        parseCont(contString.substring(j)); //verifica ce ramane din contString
                        break;
                    }
                    if (j == contString.length-1)
                    {
                        paro = contString.substring(i+1);
                        let adaugCont = new cont(user, paro);
                        LOGINDATA.push(adaugCont);
                        return;
                    }
                }
            break;
        }
    }
}

function loginStart()
{
    let loggedUser = sessionStorage.getItem("loggedIn");
    document.getElementById("salutare").innerHTML = "Bine ai venit, " + loggedUser + "!";
}

function verificaLogin() //ar fi bine sa nu fie client-side, dar pana cand invatam server-side, aia e...
{
    let uinput = document.getElementById("user").value;
    let pinput = document.getElementById("pass").value;
    let gresit = true;
    for (const client of LOGINDATA)
    {
        if (uinput == client.username && pinput == client.pw)
        {
            window.location.href = "home.html";
            sessionStorage.setItem("loggedIn", uinput);
            gresit = false;
            break;
        }
    }
    if (gresit == true)
    {
        alert("Username nu exista sau ati gresit parola.");
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    }
}

function creeazaCont()
{
    let a = document.getElementById("creeazauser").value;
    let b = document.getElementById("creeazaparola").value;
    let gasit = false;
    for (const client of LOGINDATA)
    {
        if (a == client.username)
        {
            gasit = true;
            alert("Deja exista un cont cu acest username.");
            document.getElementById("creeazauser").value = "";
            document.getElementById("creeazaparola").value = "";
            break;
        }
    }
    let parolaValida = true;
    for (let i = 0; i < b.length; i++)
    {
        if (b[i]==' ')
        {
            alert("Parola nu poate contine spatii.");
            parolaValida = false;
            document.getElementById("creeazauser").value = "";
            document.getElementById("creeazaparola").value = "";           
            break;
        }
    }
    if (a=="" || b=="")
    {
        alert("Nu putem sa avem campuri goale.");
        document.getElementById("creeazauser").value = "";
        document.getElementById("creeazaparola").value = "";           
    }
    else if (gasit == false && parolaValida == true)
    {
        /* foarte trist. as fi vrut sa fac asta sa faca update de LOGINDATA cand intra la login.html, dar se pare ca sessionStorage doar stie sa stocheze string-uri, nu de obiecte cu mai multe componente.
        let c = new cont(a, b);
        LOGINDATA.push(c);  
        alert("Contul a fost creat!"); 
        sessionStorage.setItem("conturi", LOGINDATA);
        window.location.href = "login.html";
        */
        //urmeaza o prostie sa stochez toata informatia intr-un string ca sa-si aminteasca dupa ce schimb pagini.
        if (localStorage.getItem("conturi") == null)
        {
            let contStocat = " " + a + " " + b;
            localStorage.setItem("conturi", contStocat);
        }
        else
        {
            let contStocat = localStorage.getItem("conturi") + " " + a + " " + b;
            localStorage.setItem("conturi", contStocat); 
        }
        window.location.href = "login.html";
    }
}