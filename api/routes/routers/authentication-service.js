const express = require('express');
const route = express.Router();
const RequestMiddlewares = require('../../middlewares/request');
const AuthenticationService = require('../../controllers/routers/authentication-service');

// Login Route
route.post('/api/authentication/login',
    RequestMiddlewares.generateRequestIdentifier,
    AuthenticationService.login
);

module.exports = route;
