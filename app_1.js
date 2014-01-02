var express = require("express");
var app = express();
var port = 3700;

app.get("/", function(req, res){
    res.sendfile(__dirname + '/index.html');
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', 'welcome to the chat');
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

/*var express = require("express");
 var app = express();
 var io = require('socket.io')
 io.listen(app);

 app.listen(8881);

 // routing
 app.get('/', function (req, res) {
 res.sendfile(__dirname + '/index.html');
 });

 // usernames which are currently connected to the chat
 var usernames = {};

 io.sockets.on('connection', function (socket) {

 // when the client emits 'sendchat', this listens and executes
 socket.on('sendchat', function (data) {
 // we tell the client to execute 'updatechat' with 2 parameters
 io.sockets.emit('updatechat', socket.username, data);
 });

 // when the client emits 'adduser', this listens and executes
 socket.on('adduser', function(username){
 // we store the username in the socket session for this client
 socket.username = username;
 // add the client's username to the global list
 usernames[username] = username;
 // echo to client they've connected
 socket.emit('updatechat', 'SERVER', 'you have connected');
 // echo globally (all clients) that a person has connected
 socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
 // update the list of users in chat, client-side
 io.sockets.emit('updateusers', usernames);
 });

 // when the user disconnects.. perform this
 socket.on('disconnect', function(){
 // remove the username from global usernames list
 delete usernames[socket.username];
 // update list of users in chat, client-side
 io.sockets.emit('updateusers', usernames);
 // echo globally that this client has left
 socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
 });
 });
 *//**
 * Created with JetBrains WebStorm.
 * User: larsrothaus
 * Date: 04/12/13
 * Time: 10.10
 * To change this template use File | Settings | File Templates.
 */
