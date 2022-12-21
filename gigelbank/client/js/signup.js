function createAccount() {
    // extrag datele din inputs
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const secondPassword = document.getElementById("secondPassword");

    // verific daca toate campurile sunt completate
    if (!firstName.value || !lastName.value || !email.value || !password.value || !secondPassword.value) {
        alert("Please complete all required information.");
        return;
    }

    // request (POST) catre API endpoint de register.
    // cand primesc raspuns ok, redirectionez catre signin
    // cand primesc eroare, afisez o alerta
    const URL = "http://localhost:5609/api/v1/register";
    const body = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "email": email.value,
        "password": password.value,
        "second_password": secondPassword.value
    }
    const params = {
        "method": "POST",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    }
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
    // data = continutul raspunsului (body) de la server
    console.log(data.message);
    window.location.href = "signin.html";
}

function handleError(error) {
    alert(error.message);
}