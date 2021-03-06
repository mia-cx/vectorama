
let express = require('express');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

let socket = require('socket.io');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('new connection: ' + socket.id);

    let oscPort = new osc.WebSocketPort({
        url: 'http://localhost:3001',
        metadata: true
    });
    oscPort.open();
}

console.log('The server is running');

// use socket.emit to send messages and socket.on to receive messages
