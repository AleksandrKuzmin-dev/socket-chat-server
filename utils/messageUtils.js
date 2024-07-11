const sendMessageToRoom = (io, room, name, message) => {
    io.to(room).emit('message', {
        data: {
            user: { name },
            message
        }
    });
};

const sendValueUsersInRoom = (io, room) => {
    const { numberUsersInRoom } = require('../users');
    io.to(room).emit('NumberUsersInRoom', {
        data: {
            numberUsersInRoom: numberUsersInRoom(room)
        }
    });
};

const sendMessageAboutLeavingRoom = (io, room, name) => {
    sendMessageToRoom(io, room, 'Admin', `Пользователь "${name}" покинул комнату`);
};

module.exports = {
    sendMessageToRoom,
    sendValueUsersInRoom,
    sendMessageAboutLeavingRoom
};