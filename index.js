var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var crypto = require('crypto'); // for generating random usernames
var port = process.env.PORT || 3000;

app.use(express.static("public"))



io.on('connection', function(socket){
	var usernameLength = 5;
	var id = crypto.randomBytes(usernameLength).toString('hex');
	socket.username = id;
	io.emit('chat message', socket.username + ' has joined.');

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
		io.emit('chat message', socket.username + ' has disconnected.')
	})

});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
