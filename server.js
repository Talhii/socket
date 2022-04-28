const io = require('socket.io')(3000)

const usernames = {}
io.on('connection',socket=>{
   
    socket.on('user',name=>{
        usernames[socket.id] = name
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('send-chat-message',message=>{
        socket.broadcast.emit('chat-message',{message : message,name:usernames[socket.id]})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',usernames[socket.id])
        delete usernames[socket.id]
    })
})