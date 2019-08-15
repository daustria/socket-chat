$(function () {
	var socket = io();
    var username = ""

	$('form').submit(function(e){
		e.preventDefault();
		socket.emit('chat message', username + ':' + $('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});
});

