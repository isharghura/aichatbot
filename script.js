const userMsg = document.getElementById("userText");
const list = document.getElementById("user-msgs");

function addMsg() {
    if (userMsg.value === '') {
        //do nothing
    }
    else {
        let msg = document.createElement("li");
        msg.innerHTML = userMsg.value;
        list.appendChild(msg);
    }
    userMsg.value='';
}

document.addEventListener('keydown', (event)=>{
    var whichKey=event.key;
    if(whichKey==='Enter'){
        addMsg();
    }
})