const userId = sessionStorage.getItem("userId");
if (userId) {
    window.location.href = "home.html";
}


function signIn() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!email.value || !password.value) {
        alert("Please complete all required information.");
        return;
    }
    const URL = "http://localhost:5609/api/v1/authenticate";
    const body = {
        "email": email.value,
        "password": password.value
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
    // store user ID and email inside browser memory for later use.

    // set data in local storage
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userFirstName", data.first_name);
    localStorage.setItem("userLastName", data.last_name);
    localStorage.setItem("userEmail", data.email);

    // set data in session storage
    sessionStorage.setItem("userId", data.id);
    sessionStorage.setItem("userFirstName", data.first_name);
    sessionStorage.setItem("userLastName", data.last_name);
    sessionStorage.setItem("userEmail", data.email);

    // set data in cookie
    document.cookie = `userId=${data.id};expires=Fri, 23 Dec 2022 23:59:59 UTC;path=/;`;

    window.location.href = "home.html";
}

function handleError(error) {
    alert(error.message);
}