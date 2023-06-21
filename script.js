const userInput = document.getElementById("userText");
const msgs = document.getElementById("msgs");
let count = 0;

function addMsg() {
    if (userInput.value === '') {
        //do nothing
        count=0;
    }
    else {
        let usrmsg = document.createElement("li");
        usrmsg.id = "user-msg";
        let botmsg = document.createElement("li");
        botmsg.id = "bot-msg";

        usrmsg.innerHTML = userInput.value;
        botmsg.innerHTML = "Hello!";

        msgs.appendChild(usrmsg);
        userInput.value = '';
        if (count === 1) {
            msgs.appendChild(botmsg);
            count = 0;
        }

        setTimeout(function () {
            usrmsg.classList.add("show");
        }, 10);
        setTimeout(function () {
            botmsg.classList.add("show");
        }, 500);
    }
}

document.addEventListener('keydown', (event) => {
    var whichKey = event.key;
    if (whichKey === 'Enter') {
        count++;
        event.preventDefault();
        addMsg();

        var boxElement = document.querySelector('.box');
        boxElement.scrollTop = boxElement.scrollHeight;
        userInput.focus();
    }
})