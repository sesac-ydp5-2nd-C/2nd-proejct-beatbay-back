const {
    ChatMessage,
    User,
    ChatRoom,
    UsedAbility,
    UsedProduct,
    sequelize,
} = require('../models');
const { Op } = require('sequelize');
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

// 소켓 채팅방 설정
// const productRoom = io.of('/product');
// const abilityRoom = io.of('/ability');

// productRoom.on('connection', (socket) => {
//     console.log('중고물품 채팅방');

//     socket.on('disconnection', () => {
//         console.log('중고물품 채팅방에서 유저 아웃');
//     });
// });

io.sockets.on('connection', (socket) => {
    const req = socket.request;
    const {
        headers: { referer },
    } = req;
    console.log('요청 url : ', req.headers.referer);
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

    socket.on('join', async (data, callback) => {
        console.log('#####: ', data);
        try {
            const roomCheck = await ChatRoom.findOne({
                where: {
                    // 입장시 게시물ID, 작성자ID, 발신자ID가 존재하는지 확인
                    [Op.and]: [
                        { product_id: data.object_id },
                        { user_id_1: data.receiver_id },
                        { user_id_2: data.user_id },
                    ],
                    // 자기가 작성한 글일경우 채팅방 생성 X
                    [Op.and]: [
                        { product_id: data.object_id },
                        { user_id_1: data.receiver_id },
                    ],
                },
            });
            console.log('roomCheck : ', roomCheck);
            if (!roomCheck) {
                if (data.type === 'product') {
                    const productInfo = await UsedProduct.findOne({
                        where: { product_id: data.object_id },
                    });
                    console.log(productInfo);
                    const chatRoom = await ChatRoom.create({
                        product_id: data.object_id, // 게시물 ID
                        pro_abil_img: productInfo.product_file_path, // 게시물 이미지
                        user_id_1: data.receiver_id, // 판매자
                        user_id_2: data.user_id, // 구매자
                    });
                    console.log('중고물품 채팅방 생성');
                } else if (data.type === 'ability') {
                    const abilityInfo = await UsedAbility.findOne({
                        where: { ability_id: data.object_id },
                    });
                    console.log(abilityInfo);
                    const chatRoom = await ChatRoom.create({
                        ability_id: data.object_id,
                        pro_abil_img: abilityInfo.ability_file_path,
                        user_id_1: data.user_id,
                        user_id_2: data.receiver_id,
                    });
                    console.log('재능 채팅방 생성');
                    const chatInput = await ChatMessage.create({
                        chat_room_id: roomCheck.id,
                        sender_id: data.user_id,
                        content: data.content,
                        sent_at: new Date(),
                    });
                    console.log('메세지 전송');
                }
            } else {
                const chatInput = await ChatMessage.create({
                    chat_room_id: roomCheck.id,
                    sender_id: data.user_id,
                    content: data.content,
                    sent_at: new Date(),
                });
            }
            console.log('messageData : ', data);
            // io.to(socket.id).emit('message', data.content);
            socket.broadcast.emit('update', data);

            callback();
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('disconnect', () => {
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
