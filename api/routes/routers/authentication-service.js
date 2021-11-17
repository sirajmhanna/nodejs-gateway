const express = require("express");
const route = express.Router();
const RequestMiddlewares = require("../../middlewares/request");
const AuthenticationService = require("../../controllers/routers/authentication-service");
const AuthenticationMiddleware = require("../../middlewares/authentication");

// Login Route
route.post(
  "/api/authentication/login",
  RequestMiddlewares.generateRequestIdentifier,
  AuthenticationService.login
);

// Logout Route
route.post(
  "/api/authentication/logout",
  RequestMiddlewares.generateRequestIdentifier,
  AuthenticationMiddleware.isAuthenticated,
  AuthenticationService.logout
);

// Change Password Route
route.patch(
  "/api/authentication/password/change",
  RequestMiddlewares.generateRequestIdentifier,
  AuthenticationMiddleware.isAuthenticated,
  AuthenticationService.changePassword
);

// Request Reset Password Route
route.get(
  "/api/authentication/password/reset",
  RequestMiddlewares.generateRequestIdentifier,
  AuthenticationService.requestResetPassword
);

// Confirm Reset Password Route
route.patch(
  "/api/authentication/password/reset/confirm",
  RequestMiddlewares.generateRequestIdentifier,
  AuthenticationService.confirmResetPassword
);

// Generate Access Token Route
route.post(
  "/api/authentication/token/refresh",
  RequestMiddlewares.generateRequestIdentifier,
  AuthenticationService.generateAccessToken
);

module.exports = route;
