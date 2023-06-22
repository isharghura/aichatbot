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
        }, 10);
    }
}

document.addEventListener('keydown', (event) => {
    var whichKey = event.key;
    if (whichKey === 'Enter') {
        event.preventDefault();
        addMsg();

        var boxElement = document.querySelector('.box');
        boxElement.scrollTop = boxElement.scrollHeight;
        userInput.focus();
    }
})

function getTime() {
    let today=new Date();
    hours=today.getHours();
    minutes=today.getMinutes();

    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let time = hours + ":" + minutes;
    return time;
}

function firstBotMessage(){
    let botmsg = document.createElement("li");
    botmsg.id = "bot-msg";
    botmsg.innerHTML = "Hi! How can I help you?";

    msgs.appendChild(botmsg);

    setTimeout(function () {
        botmsg.classList.add("show");
    }, 500);

    let time=getTime();
    $("#chat-timestamp").append(time);
}