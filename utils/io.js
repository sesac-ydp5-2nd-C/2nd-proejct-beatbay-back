const {
    ChatMessage,
    User,
    ChatRoom,
    UsedAbility,
    UsedProduct,
    sequelize,
} = require('../models');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    },
});

app.get('/', (req, res) => {
    res.send('채팅 서버 연결');
});

// 접속 한 유저 리스트
const users = [];
let userRooms;

io.sockets.on('connection', (socket) => {
    console.log('접속 된 유저 socketId : ', socket.id);

    socket.on('newUser', async (name) => {
        // console.log(name.email + '입장');

        // const user = name.email;
        console.log('name: ', name);
        try {
            const userData = await User.findOne({
                where: { user_id: name.email },
            });
            users.push({ id: userData.id, socketId: socket.id });
            console.log('접속 중인 유저: ', users);

            userRooms = await ChatRoom.findAll({
                where: { id: userData.id },
            });
            io.to(socket.id).emit('room_List', userRooms);
            console.log('userRooms:', userRooms);

            // io.sockets.emit('update: ', {
            //     type: 'connect',
            //     name: 'SERVER',
            //     message: userData.user_nickname + '님이 접속',
            // });
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('sendMessage', async (data, callback) => {
        const chatInput = await ChatMessage.create({
            chat_room_id: 1,
            sender_id: data.user_id,
            content: data.content,
            sent_at: new Date(),
        });

        console.log('messageData : ', data);
        // io.to(socket.id).emit('message', data.content);
        socket.broadcast.emit('update', data);

        callback();
    });

    socket.on('disconnect', () => {
        console.log('sssss : ', socket);
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
