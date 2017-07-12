var express=require('express');
var app=express();
var socket=require('socket.io');
var server=app.listen(process.env.PORT || 5000,function()
{
console.log("Server Started at Port"+process.env.PORT || 5000);
});

//Static Files
app.use(express.static('public'));

//Connecting with socket
var io= socket(server);

io.on('connection',function(socket)
{

console.log("Socket Connected");

var gp="Public";
//Creating New Group and adding this socket to it
  socket.on('group', function(group) {
        console.log("New Group:"+group);
        socket.leave("Public");
        socket.join(group);
        gp=group;
        
    });

     socket.on('default_group', function(group) {
        console.log("Default Group:"+group);
        socket.join(group);
        gp=group;
        
    });

/*//Dislay all connected sockets
Object.keys(io.sockets.sockets).forEach(function(id) {
    console.log("ID:",id)  // socketId
})
*/
socket.on('neww',function(data)
{
    socket.to(gp).emit('neww',data);
    //socket.broadcast.emit('neww',data);
})


//Process Event
socket.on('chat',function(data)
{
    io.sockets.in(gp).emit('chat',data);
    //io.sockets.emit('chat',data);
})

//Typing Event Handle
socket.on('typing',function(data)
{
    socket.to(gp).emit('typing',data);
    //io.socket.to('gp').emit('typing',data);
    //socket.broadcast.emit('typing',data);
}
)

  //Automatically Disconnect with socket when a user exit
    socket.on('disconnect', function(){
    console.log('user disconnected');
    });
});
