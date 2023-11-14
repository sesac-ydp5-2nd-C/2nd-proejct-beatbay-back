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
const https = require('https');
const fs = require('fs');
let io;
let server;
if (process.env.IS_PRODUCTION === 'YES') {
    const options = {
        key: fs.readFileSync(
            `/etc/letsencrypt/live/${process.env.PRODUCTION_DOMAIN}/privkey.pem`
        ),
        cert: fs.readFileSync(
            `/etc/letsencrypt/live/${process.env.PRODUCTION_DOMAIN}/cert.pem`
        ),
        ca: fs.readFileSync(
            `/etc/letsencrypt/live/${process.env.PRODUCTION_DOMAIN}/fullchain.pem`
        ),

        requestCert: false,
        rejectUnauthorized: false,
    };
    server = https.createServer(options, app);
} else {
    server = require('http').createServer(app);
}
io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

// 접속 한 유저 리스트
const users = [];

app.get('/', (req, res) => {
    res.send('채팅 서버 연결');
});

io.sockets.on('connection', (socket) => {
    socket.on('newUser', async (name) => {
        let userRooms = [];
        let roomInfo = {};

        try {
            const userData = await User.findOne({
                where: { user_id: name.email },
            });
            users.push({ id: userData.id, socketId: socket.id });

            // 사용유저가 존재하는 방 조회
            const userRoomsCheck = await ChatRoom.findAll({
                where: {
                    [Op.or]: [
                        { user_id_1: userData.id },
                        { user_id_2: userData.id },
                    ],
                },
            });

            for (const chatRoom of userRoomsCheck) {
                const user1 = chatRoom.user_id_1;
                const user2 = chatRoom.user_id_2;
                const productId = chatRoom.product_id;
                const abilityId = chatRoom.ability_id;

                if (user1) {
                    const user1Info = await User.findOne({
                        where: { id: user1 },
                    });
                    const user2Info = await User.findOne({
                        where: { id: user2 },
                    });
                    const lastMessage = await ChatMessage.findOne({
                        where: { chat_room_id: chatRoom.id },
                        limit: 1,
                        order: [['sent_at', 'DESC']],
                    });

                    const lastMessageContent = lastMessage
                        ? lastMessage.content
                        : null;

                    const roomInfo = {
                        room_id: chatRoom.id,
                        user_1: user1Info,
                        user_2: user2Info,
                        last_message: lastMessageContent,
                    };
                    if (productId) {
                        const productInfo = await UsedProduct.findOne({
                            where: { product_id: chatRoom.product_id },
                        });
                        roomInfo.product_info = productInfo;
                    } else if (abilityId) {
                        // Ability 정보 가져오기
                        const abilityInfo = await UsedAbility.findOne({
                            where: { ability_id: chatRoom.ability_id },
                        });
                        roomInfo.ability_info = abilityInfo;
                    }

                    userRooms.push(roomInfo);
                }
            }
            io.to(socket.id).emit('room_List', userRooms);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('join', async (data, callback) => {
        // let roomInfo = {};
        let roomId;
        try {
            const roomCheck = await ChatRoom.findOne({
                where: {
                    [Op.and]: [
                        {
                            [Op.and]: [
                                { product_id: data.object_id },
                                { user_id_1: data.receiver_id },
                                { user_id_2: data.user_id },
                            ],
                        },
                        {
                            [Op.and]: [
                                { product_id: data.object_id },
                                { user_id_1: data.receiver_id },
                            ],
                        },
                    ],
                },
            });

            if (!roomCheck) {
                if (data.type === 'product') {
                    const productInfo = await UsedProduct.findOne({
                        where: { product_id: data.object_id },
                    });

                    const chatRoom = await ChatRoom.create({
                        product_id: data.object_id, // 게시물 ID
                        pro_abil_img: productInfo.product_file_path, // 게시물 이미지
                        user_id_1: data.receiver_id, // 판매자
                        user_id_2: data.user_id, // 구매자
                    });
                    roomId = await ChatRoom.findOne({
                        where: {
                            product_id: data.object_id,
                            pro_abil_img: productInfo.product_file_path,
                            user_id_1: data.receiver_id,
                            user_id_2: data.user_id,
                        },
                    });
                    data.room_id = roomId.id;

                    const chatInput = await ChatMessage.create({
                        chat_room_id: roomId.id,
                        sender_id: data.user_id,
                        content: data.content,
                        sent_at: new Date(),
                    });
                } else if (data.type === 'ability') {
                    const abilityInfo = await UsedAbility.findOne({
                        where: { ability_id: data.object_id },
                    });

                    const chatRoom = await ChatRoom.create({
                        ability_id: data.object_id,
                        pro_abil_img: abilityInfo.ability_file_path,
                        user_id_1: data.receiver_id,
                        user_id_2: data.user_id,
                    });
                    roomId = await ChatRoom.findOne({
                        where: {
                            ability_id: data.object_id,
                            pro_abil_img: abilityInfo.ability_file_path,
                            user_id_1: data.receiver_id,
                            user_id_2: data.user_id,
                        },
                    });

                    data.room_id = roomId.id;

                    const chatInput = await ChatMessage.create({
                        chat_room_id: roomId.id,
                        sender_id: data.user_id,
                        content: data.content,
                        sent_at: new Date(),
                    });
                }
            } else {
                const chatInput = await ChatMessage.create({
                    chat_room_id: roomCheck.id,
                    sender_id: data.user_id,
                    content: data.content,
                    sent_at: new Date(),
                });
                data.room_id = roomCheck.id;
            }

            io.to(socket.id).emit('message', data);

            callback(data.room_id);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('enter', async (data) => {
        let roomData = [];
        let enterRoomInfo = {};
        const roomId = data.room_id;

        try {
            const selectRoom = await ChatRoom.findOne({
                where: { id: roomId },
            });

            const messageList = await ChatMessage.findAll({
                where: { chat_room_id: roomId },
            });

            // 선택된 방에서 물건 채팅인지, 재능 거래 채팅인지 구분을 위한 조건문
            if (!selectRoom.ability_id) {
                const productData = await UsedProduct.findOne({
                    where: { product_id: selectRoom.product_id },
                });

                enterRoomInfo.productInfo = productData;
            } else {
                const abilityData = await UsedAbility.findOne({
                    where: { ability_id: selectRoom.ability_id },
                });

                enterRoomInfo.productInfo = abilityData;
            }
            enterRoomInfo.room_id = roomId;
            enterRoomInfo.messageList = messageList;

            roomData.push(enterRoomInfo);
        } catch (err) {
            console.log(err);
        }
        io.to(socket.id).emit('roomData', roomData);
    });

    socket.on('sendMessage', async (data, callback) => {
        const chatInput = await ChatMessage.create({
            chat_room_id: data.room_id,
            sender_id: data.user_id,
            content: data.content,
            sent_at: new Date(),
        });

        io.to(socket.id).emit('message', data);
        users.forEach((e) => {
            if (e.id == data.receiver_id) {
                io.to(e.socketId).emit('message', data);
            }
        });

        callback();
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

server.listen(5001, () => {
    console.log(
        `${
            process.env.IS_PRODUCTION === 'YES' ? 'PRODUCTION' : 'DEVELOPMENT'
        } : Socket on PORT 5001`
    );
});
