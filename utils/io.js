const { ChatMessage, User, sequelize } = require('../models');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    },
});

// const io = socket(http); // 채팅을 위한 소켓

app.get('/', (req, res) => {
    res.send('채팅 서버 연결');
});

io.sockets.on('connection', (socket) => {
    console.log('유저 접속됨');
    console.log('소켓정보 : ', socket.data);

    socket.on('newUser', async (name) => {
        // console.log(name.email + '입장');

        const user = name.email;
        console.log(user + '입장');
        try {
            const userData = await User.findOne({
                where: { user_id: user },
            });
            console.log('접속한 유저 데이터 : ', userData);
        } catch (err) {
            console.log(err);
        }

        socket.name = name;
        io.sockets.emit('update: ', {
            type: 'connect',
            name: 'SERVER',
            message: name + '님이 접속',
        });
    });

    socket.on('message', async (data, callback) => {
        data.name = socket.name;
        const chatInput = await ChatMessage.create({
            chat_room_id: 1,
            sender_id: 1,
            receiver_id: 2,
            content: data.message,
            sent_at: new Date(),
        });

        console.log(data);

        socket.broadcast.emit('update', data);

        callback();
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
