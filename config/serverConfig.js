const cors = require('cors');
const express = require('express');

const configureServer = (app) => {
    app.use(cors({ origin: "*" }));
    app.use(express.json()); // Для обработки JSON-запросов
    app.use(express.urlencoded({ extended: true })); // Для обработки URL-encoded запросов
    app.use(require('../route'));
};

module.exports = configureServer;