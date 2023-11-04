const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http').createServer(app);
const io = socket(http); // 채팅을 위한 소켓

app.get('/', (req, res) => {
    res.send('채팅 서버 연결');
});

io.sockets.on('connection', (socket) => {
    console.log('유저 접속됨');

    socket.on('newUser', (name) => {
        console.log(name + '입장');

        socket.name = name;

        io.sockets.emit('update: ', {
            type: 'connect',
            name: 'SERVER',
            message: name + '님이 접속',
        });
    });

    socket.on('message', (data) => {
        data.name = socket.name;

        console.log(data);

        socket.broadcast.emit('update', data);
    });

    socket.on('disconnect', () => {
        console.log(socket.name + '님이 나갔음');
        socket.broadcast.emit('update', {
            type: 'disconnect',
            name: 'SERVER',
            message: socket.name + '님이 나갔음',
        });
    });
});

http.listen(5001, () => {
    console.log('Connected at 5001');
});
