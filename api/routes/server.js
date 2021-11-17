const express = require("express");
const route = express.Router();
const ServerControllers = require("../controllers/server");
const RequestMiddlewares = require("../middlewares/request");

// Server Health Route
route.get(
  "/health",
  RequestMiddlewares.generateRequestIdentifier,
  ServerControllers.health
);

module.exports = route;
