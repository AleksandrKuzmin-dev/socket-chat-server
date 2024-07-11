const cors = require('cors');
const express = require('express');

const configureServer = (app) => {
    app.use(cors({ origin: "*" }));
    app.use(require('../route'));
};

module.exports = configureServer;   