var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	socket.on('connect'. function(){
		io.emit('User connected.');
	});

	socket.on('disconnect', function(){
		io.emit('User disconnected.');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

});

http.listen(port, function(){
	console.log('listening on *:' + port);
});