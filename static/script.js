const userInput = document.getElementById("userText");
const msgs = document.getElementById("msgs");

function addMsg() {
    if (userInput.value === '') {
        //do nothing
    } else {
        let usrmsg = document.createElement("li");
        usrmsg.id = "user-msg";
        usrmsg.innerHTML = userInput.value;

        msgs.appendChild(usrmsg);
        userInput.value = '';

        setTimeout(function () {
            usrmsg.classList.add("show");
            sendUserInput(usrmsg.innerHTML);
        }, 10);
    }
}

function scrollDown() {
    var boxElement = document.querySelector('.box');
    boxElement.scrollTop = boxElement.scrollHeight;
    userInput.focus();
}

document.addEventListener('keydown', (event) => {
    var whichKey = event.key;
    if (whichKey === 'Enter') {
        event.preventDefault();
        addMsg();

        scrollDown();
    }
});

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let time = hours + ":" + minutes;
    return time;
}

function firstBotMessage() {
    let botmsg = document.createElement("li");
    botmsg.id = "bot-msg";
    botmsg.innerHTML = "Hi! How can I help you?";

    msgs.appendChild(botmsg);

    setTimeout(function () {
        botmsg.classList.add("show");
    }, 500);

    let time = document.getElementById("chat-timestamp");
    time.innerHTML = getTime();
}

firstBotMessage();

function sendUserInput(input) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/process', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var responseMessage = response.response;
            displayBotResponse(responseMessage);
        }
    };
    xhr.send('input_variable=' + encodeURIComponent(input));
}

function displayBotResponse(response) {
    let botmsg = document.createElement("li");
    botmsg.id = "bot-msg";
    botmsg.innerHTML = response;

    msgs.appendChild(botmsg);

    setTimeout(function () {
        botmsg.classList.add("show");
        scrollDown();
    }, 500);
}
