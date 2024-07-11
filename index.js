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

server.listen(5000, () => {
    console.log('Сервер запущен');
});