var socket = io.connect('https://blooming-escarpment-31686.herokuapp.com:process.env.PORT || 5000');

var message=document.getElementById('message');
var naam=prompt("Enter Your Name");

var btn=document.getElementById('send');
var output=document.getElementById('output');
var tipe=document.getElementById('tipe');
var neww=document.getElementById('neww');
var room=document.getElementById('room');

//var group='ABC';
//creating room
//room.addEventListener('click',function()
function roomie(group)
{
  // group=prompt("Enter Group Name"); 
    // socket.on('connect', function() {
   socket.emit('group', group);
      //});
}//)

if(room.value="Public")
{
    socket.emit('default_group', "Public");
}

//Emiting event to create a new Group
socket.on('connect', function() {
   // console.log("Sockk");
   //socket.emit('group', group);
      });


//Sending Name To All
socket.emit('neww',naam);

//Getting Name on New
socket.on('neww',function(data)
{
neww.innerHTML = data + " is connected </br>";
})

//Emiting Event

btn.addEventListener('click',function()
//function send()
{
//socket.emit('group', room.value);
socket.emit('chat',{
    name : naam,
    message : message.value
});
message.value="";
});

//Handling Event
socket.on('chat',function(data)
{
    tipe.innerHTML = "";
    neww.innerHTML = "";
    output.innerHTML += "<b>"+ data.name +" :</b> " + data.message + "</br> ";
})

//Typing Function
message.addEventListener('keypress',function()
{
socket.emit('typing',naam);    
})

//Typing Event Handle
socket.on('typing',function(data)
{
tipe.innerHTML = data+" is typing ";
})
