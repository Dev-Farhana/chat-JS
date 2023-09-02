
const meSelectorBtn = document.querySelector('#me-selector');
const youSelectorBtn = document.querySelector('#you-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMsgs = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chatinput');
const clearChatBtn = document.querySelector('.clear-chat-btn');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMsgElement = (message) => 
    ` <div class = "message ${message.sender === 'me' ? 'blue-bg' : 'gray-bg'}" >
    <div class="message-sender"> ${message.sender} </div>
    <div class="message-text"> ${message.text} </div>
    <div class="message-timestamp"> ${message.timestamp} </div>
    </div> `

 window.onload = () => {
    messages.forEach((message) => {
        chatMsgs.innerHTML += createChatMsgElement(message);
    })
}

let messageSender = "me";

const updateMsgSender = (name) => {
    messageSender = name;
    //innerTxt fucking Txt
    chatHeader.innerText = `${messageSender} chatting..`;
    chatInput.placeHolder = `Type here, ${messageSender}...`;

    if(name === 'me'){
        meSelectorBtn.classList.add('active-person');
        youSelectorBtn.classList.remove('active-person');
    }

    if(name === 'you'){
        youSelectorBtn.classList.add('active-person');
        meSelectorBtn.classList.remove('actvie-person');
    }
    //  auto-focus the input field 
    chatInput.focus();
}

meSelectorBtn.onclick = () => updateMsgSender('me');
youSelectorBtn.onclick = () => updateMsgSender('you');

const sendMsg = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString( 'en-us', {hour: 'numeric', minute: 'numeric',hour12: true})
    // hourCycle: 'h12' 
    const message = {
        sender: messageSender ,
        text: chatInput.value,
        timestamp,
    }
    //    Save message to local storage 
      messages.push(message)
      localStorage.setItem('messages', JSON.stringify(messages))
      // messages.push(message)
      // localStorage.setItem('messages', JSON.stringify(messages))
    
    //   add Msg to DoM;
        chatMsgs.innerHTML += createChatMsgElement(message); 

    //Clear input
    chatInputForm.reset();
    //   Scroll to bottom of chat messages 
        chatMsgs.scrollTop = chatMsgs.scrollHeight;

}
chatInputForm.addEventListener('submit', sendMsg);

clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    chatMsgs.innerHTML = "";
})
