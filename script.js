const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input') 
const socket = io('http://localhost:3000')
const name = prompt('Enter Your Name to Proceed')
appendMessage('You are Connected')
socket.emit('user',name)

socket.on('chat-message',data=>{
    appendMessage(data.name +":"+data.message )
})

socket.on('user-connected',name=>{
    appendMessage(name +" is Connected")
})

socket.on('user-disconnected',name=>{
    appendMessage(name +" is disConnected")
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message = messageInput.value 
    appendMessage("You:"+message )
    socket.emit('send-chat-message',message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}