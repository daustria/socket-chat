$(function () {
	var socket = io();
    var username = '';

	$('form').submit(function(e){
		e.preventDefault();
		socket.emit('add message', username + ': ' + $('#m').val());
		$('#m').val('');
		return false;
	});

    socket.on('connect', function(){
        username = socket.id;
    })

	socket.on('add message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});
});

