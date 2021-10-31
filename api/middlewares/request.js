const logger = require('../../config/winston');

/**
 * Generate Request ID Middleware
 * @param { Object } req 
 * @param { Object } res 
 * @param { Object } next 
 * @returns { Object }
 */
exports.generateRequestIdentifier = async (req, res, next) => {
    const requestID = new Date().getTime();

    logger.info(requestID, 'requests', 'generateRequestIdentifier', 'Generating A New Request ID', { date: new Date(), ipAddress: req.ip });
    req.requestID = requestID;

    return next();
};
