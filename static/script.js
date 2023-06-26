const userInput = document.getElementById("userText");
const msgs = document.getElementById("msgs");

function addMsg() {
    if (userInput.value === '') {
        //do nothing
    }
    else {
        let usrmsg = document.createElement("li");
        usrmsg.id = "user-msg";
        usrmsg.innerHTML = userInput.value;

        msgs.appendChild(usrmsg);
        userInput.value = '';

        setTimeout(function () {
            usrmsg.classList.add("show");
            intents(usrmsg.innerHTML);
        }, 10);
    }
}

function scrollDown(){
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
})

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

function intents(userText) {
    let botResponse = getBotResponse(userText);
    let botmsg = document.createElement("li");
    botmsg.id = "bot-msg";
    botmsg.innerHTML=botResponse;

    msgs.appendChild(botmsg);

    setTimeout(function () {
        botmsg.classList.add("show");
        scrollDown();
    }, 500);
}

function getBotResponse(input) {
    if (input === 'rock') {
        return 'Paper';
    }
    else if (input === 'paper') {
        return 'Scissors';
    }
    else if (input === 'scissors') {
        return 'Rock';
    }

    if (input === 'How is the weather today?') {
        return 'Splendid. Today it is a warm and sunny day!';
    }
    else if (input === 'What came first, the chicken or the egg?') {
        return 'According to my calculations, eggs came first.';
    }
    else if (input === 'What time is it?') {
        return 'It is 18:00.';
    }

    if (input === 'hello') {
        return 'Greetings!';
    }
    else if (input === 'bye') {
        return 'Farewell!';
    }
    else {
        return 'Try asking me something else!';
    }
}