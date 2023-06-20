const userMsg = document.getElementById("userText");
const botmsgs = document.getElementById("bot-msgs");
const usermsgs = document.getElementById("msgs");

function addMsg() {
    if (userMsg.value === '') {
        //do nothing
    }
    else {
        let usrmsg = document.createElement("li");
        let botmsg = document.createElement("li");
        usrmsg.id="user-msg";
        botmsg.id="bot-msg";

        usrmsg.innerHTML = userMsg.value;
        botmsg.innerHTML="blah";

        usermsgs.appendChild(usrmsg);
        botmsgs.appendChild(botmsg);
    }
    userMsg.value='';
}

document.addEventListener('keydown', (event)=>{
    var whichKey=event.key;
    if(whichKey==='Enter'){
        addMsg();
    }
})