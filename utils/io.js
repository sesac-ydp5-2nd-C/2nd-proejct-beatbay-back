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

const users = [];

io.sockets.on('connection', (socket) => {
    console.log('유저 접속됨');

    console.log('소켓정보id? : ', socket.id);

    socket.on('newUser', async (name) => {
        // console.log(name.email + '입장');

        // const user = name.email;
        // console.log(user + '입장');
        try {
            const userData = await User.findOne({
                where: { user_id: name.email },
            });
            users.push({ id: userData.id, socketId: socket.id });
            console.log('접속 중인 유저: ', users);
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

    socket.on('sendMessage', async (data, callback) => {
        const chatInput = await ChatMessage.create({
            chat_room_id: 1,
            sender_id: 1,
            receiver_id: 2,
            content: data.content,
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
        // 연결 해제한 유저 리스트에서 제거
        users.splice(users.indexOf(socket), 1);
    });
});

http.listen(5001, () => {
    console.log('Connected at 5001');
});
