function loginStart() {
    const firstName = sessionStorage.getItem("userFirstName");
    document.getElementById("salutare").innerHTML = "Bine ai venit, " + firstName + "!";
}

function getAccountDetails() {
    const userId = sessionStorage.getItem("userId");
    const URL = `http://localhost:5609/api/v1/bank-accounts/${userId}`;
    const params = {
        "method": "GET",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json"
        }
    };

    fetch(URL, params).then(responseReceived).then(processData).catch(handleError);
}

function responseReceived(response) {
    // response = response de la server
    if (!response.ok) {
        alert("Something went wrong. I couldn't register you.");
        throw Error("Unable to register user.");
    }
    else {
        return response.json();
    }
}

function processData(data) {
    initializePage(data);
}

function handleError(error) {
    alert(error.message);
}

function initializePage(conturi) {
    const userFirstName = sessionStorage.getItem("userFirstName");
    const userLastName = sessionStorage.getItem("userLastName");
    const userFullName = `${userFirstName} ${userLastName}`;

    const accountSection = document.getElementById("main-section");
    for (const cont of conturi) {
        const div = document.createElement("div");
        const titular = document.createElement("p");
        titular.innerText = `TITULAR: ${userFullName}`;
        titular.style.color = "white";
        div.appendChild(titular);

        const numarCont = document.createElement("p");
        numarCont.innerText = `NR CONT ${cont.account_number}`;
        numarCont.style.color = "white";
        div.appendChild(numarCont);

        const balanta = document.createElement("p");
        balanta.innerText = `BALANTA ${cont.balance}`;
        balanta.style.color = "white";
        div.appendChild(balanta);

        const br = document.createElement("br");
        div.appendChild(br);

        accountSection.appendChild(div);
    }
}

getAccountDetails();