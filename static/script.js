const userInput = document.getElementById("userText");
const msgs = document.getElementById("msgs");

// Adds a user message to the chat interface
function addMsg() {
    if (userInput.value === '') { }
    else {
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

// Scrolls to the bottom
function scrollDown() {
    var boxElement = document.querySelector('.box');
    boxElement.scrollTop = boxElement.scrollHeight;
    userInput.focus();
}

// Sends a user's message after pressing enter
document.addEventListener('keydown', (event) => {
    var whichKey = event.key;
    if (whichKey === 'Enter') {
        event.preventDefault();
        addMsg();
        scrollDown();
    }
});

// Retrieves the current local time
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

// Prompts user to ask a question
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

// Sends user input to the server for processing and gets a response
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

// Displays the bot's message
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
