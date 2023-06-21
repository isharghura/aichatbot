const userMsg = document.getElementById("userText");
const usermsgs = document.getElementById("msgs");

function addMsg() {
    if (userMsg.value === '') {
        //do nothing
    }
    else {
        let usrmsg = document.createElement("li");
        usrmsg.id = "user-msg";

        usrmsg.innerHTML = userMsg.value;

        usermsgs.appendChild(usrmsg);
        userMsg.value = '';
    }
}

document.addEventListener('keydown', (event) => {
    var whichKey = event.key;
    if (whichKey === 'Enter') {
        event.preventDefault();
        addMsg();
        var boxElement = document.querySelector('.box');
        boxElement.scrollTop = boxElement.scrollHeight;
        userText.focus();
    }
})