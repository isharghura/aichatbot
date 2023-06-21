const userInput = document.getElementById("userText");
const msgs = document.getElementById("msgs");
let count = 0;

function addMsg() {
    if (userInput.value === '') {
        //do nothing
    }
    else {
        let usrmsg = document.createElement("li");
        usrmsg.id = "user-msg";
        let botmsg = document.createElement("li");
        botmsg.id = "bot-msg";

        usrmsg.innerHTML = userInput.value;
        botmsg.innerHTML = "blah";

        msgs.appendChild(usrmsg);
        userInput.value = '';
        if (count === 5) {
            msgs.appendChild(botmsg);
        }
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