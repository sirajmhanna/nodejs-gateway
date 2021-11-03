const express = require('express');
const route = express.Router();
const RequestMiddlewares = require('../../middlewares/request');
const AuthenticationService = require('../../controllers/routers/authentication-service');
const AuthenticationMiddleware = require('../../middlewares/authentication');

// Login Route
route.post('/api/authentication/login',
    RequestMiddlewares.generateRequestIdentifier,
    AuthenticationService.login
);

// Logout Route
route.post('/api/authentication/logout',
    RequestMiddlewares.generateRequestIdentifier,
    AuthenticationMiddleware.isAuthenticated,
    AuthenticationService.logout
);

module.exports = route;
