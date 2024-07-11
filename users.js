let users = [];

const addUser = (name, room) => {
    users.push({
        name,
        room
    });
};

const deleteUser = (name, room) => {
    users = users.filter(user => user.name != name && user.room != room);
}


const findUser = (name, room) => {
    return users.find(user => (user.name === name && user.room === room));
}

const numberUsersInRoom = (room) => {
    const usersInRoom = users.filter(user => user.room === room);
    return usersInRoom.length;
};

module.exports = {
    addUser,
    deleteUser,
    findUser,
    numberUsersInRoom
    
}







