const logger = require("../../helpers/winston");

/**
 * Server Health Controller
 * @method GET
 * @example
 * {
    "status": "success",
    "message": "Server is alive",
    "data": {
    "service": "gateway"
            }
 * }
 * 
 * @param { Object } req 
 * @param { Object } res 
 * @returns { Object }
 */
exports.health = (req, res) => {
  logger.info(
    new Date().getTime(),
    "server",
    "health",
    "Checking server health",
    { ipAddress: req.ip }
  );
  return res.status(200).json({
    status: "success",
    message: "Server is alive",
    data: {
      service: process.env.SERVICE_NAME,
    },
  });
};
