function send() {
    // change element value
    const paragraph = document.getElementById('paragraph');
    paragraph.innerText = 'Clicked button. Awaiting data...';

    // get input 
    const input = document.getElementById("text")
    const inputValue = input.value;
    console.log(inputValue);

    // store input value
    sessionStorage.setItem('input-value',  inputValue);

    // make request
    const body = {
        data: inputValue
    };

    const URL = "http://localhost:5609/api/v1/gigel";
    const params = {
        'method': 'POST',
        'mode': 'cors',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(body)
    }

    fetch(URL, params)
    .then(responseReceived)
    .then(dataReceived)
    .catch(errorReceived);

    console.log(body);
}

function responseReceived(response) {
    const sentValue = sessionStorage.getItem('input-value');
    console.log(`Sent value = ${sentValue}`);

    return response.json();
}

function dataReceived(data) {
    const body = document.getElementById("body");
    const response = document.createElement('p');
    response.innerText = JSON.stringify(data);
    body.appendChild(response);

    const paragraph = document.getElementById("paragraph");
    paragraph.innerText = "Data received.";
}

function errorReceived(error) {
    const paragraph = document.getElementById('paragraph');
    paragraph.innerText = 'Error occured. Try again...';

    alert(error.message);
}
