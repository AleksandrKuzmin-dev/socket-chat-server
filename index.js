const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const configureServer = require('./config/serverConfig');
const handleSocketConnection = require('./controllers/socketHandlers');

const app = express();
configureServer(app);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

handleSocketConnection(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Сервер запущен');
});