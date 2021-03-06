
let express = require('express');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

let socket = require('socket.io');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('new connection: ' + socket.id);
}

// OSC Server
let osc = require('osc');

let udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 3001,
    metadata: true
});

udpPort.on('message', (oscMsg, timeTag, info) => {
    if(oscMsg.address === '/message') console.log(oscMsg.args[0].value);
});

udpPort.on('error', (err) => {
    console.log(`Error message: ${err}`);
});

udpPort.open();

console.log('The server is running');

// use socket.emit to send messages and socket.on to receive messages
