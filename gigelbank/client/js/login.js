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

function resetTot()
{
    sessionStorage.setItem("loggedIn", "");
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
        }
    }
    if (gresit == true)
    {
        alert("Username nu exista sau ati gresit parola.");
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    }
}