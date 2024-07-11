const {
    addUser,
    deleteUser,
    findUser,
} = require('../users');

const {
    sendMessageToRoom,
    sendValueUsersInRoom,
    sendMessageAboutLeavingRoom
} = require('../utils/messageUtils');

const handleSocketConnection = (io) => {
    io.on('connection', (socket) => {
        let currentUserName;
        let currentUserRoom;

        socket.on('join', ({ room, name }) => { 
            currentUserName = name;
            currentUserRoom = room;

            if (room === '' || name === '') return;

            const existingUser = findUser(name, room);

            if (!existingUser) {
                addUser(name, room);
                socket.join(room);
                sendMessageToRoom(io, room, 'Admin', `К комнате присоединился: ${name}`);
            } else {
                currentUserName = null;
                currentUserRoom = null;
                socket.emit('connectionDenied');
                return;
            }

            sendValueUsersInRoom(io, room);
        });

        socket.on('message', ({ room, name, message }) => {
            sendMessageToRoom(io, room, name, message)
        });

        socket.on('leftRoom', ({ room, name }) => {
            deleteUser(name);
            sendMessageAboutLeavingRoom(io, room, name);
            sendValueUsersInRoom(io, room);
            currentUserRoom = null;
        });

        socket.on('disconnect', () => {
            setTimeout(() => {
                if (currentUserName && currentUserRoom) {
                    deleteUser(currentUserName);
                    sendMessageAboutLeavingRoom(io, currentUserRoom, currentUserName);
                    sendValueUsersInRoom(io, currentUserRoom);
                }
            }, 3000);
        });
    });
};

module.exports = handleSocketConnection;