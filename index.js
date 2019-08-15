var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static("public"))

io.on('connection', function(socket){

	io.emit('add message', socket.id + ' has joined.');

	socket.on('add message', function(msg){
		io.emit('add message', msg);
	});

	socket.on('disconnect', function(){
		io.emit('add message', socket.id + ' has disconnected.')
	})

});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
