
let express = require('express');

let app = express();
let server = app.listen(3000);

let users = [];

app.use(express.static('public'));

let socket = require('socket.io');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('new connection: ' + socket.id);
    users[users.length] = socket.id;
    socket.emit('/instance', users.length);

    socket.on('/knobData', (data) => {
        if (data.address !== undefined) {
            udpPort.send({
                address: data.address,
                args: [
                    {
                        type: 'i',
                        value: data.value
                    }
                ]
            }, 'localhost', 3006);
        }
    });

    socket.on('/newEffect', (data) => {
        udpPort.send({
            address: '/newEffect',
            args: [
                {
                    type: 'i',
                    value: data.slot
                },
                {
                    type: 's',
                    value: data.effect
                }
            ]
        }, 'localhost', 3006);
    });

    socket.on('/clearSlot', (slot) => {
        udpPort.send({
            address: '/clearSlot',
            args: [
                {
                    type: 'i',
                    value: slot
                }
            ]
        }, 'localhost', 3006);
    });

    socket.on('/resetPitch', () => {
        udpPort.send({
            address: '/resetPitch',
            args: [
                {
                    type: 'T'
                }
            ]
        }, 'localhost', 3006);
    });

    socket.on('disconnect', () => {
        for (let i = 0; i < users.length; i++) {
            if (users[i] === socket.id) {
                users.splice(i, 1);
            }
        }
    });
}

// OSC Server
let osc = require('osc');

let udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 3005,
    metadata: true
});

udpPort.on('error', (err) => {
    console.log(`Error message: ${err}`);
});

udpPort.open();

// udpPort.send({
//     address: '/test',
//     args: [
//         {
//             type: 'i',
//             value: 420
//         },
//         {
//             type: 's',
//             value: 'string'
//         }
//     ]
// }, 'localhost', 3006);

console.log('The server is running');

// use socket.emit to send messages and socket.on to receive messages
