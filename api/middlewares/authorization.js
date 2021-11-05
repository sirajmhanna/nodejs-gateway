const logger = require('../../config/winston');
const commonResponses = require('../../helpers/common-responses');

/**
 * User Authorization Middleware
 * @param { Array } allowedRoles 
 * @returns { Promise }
 */
exports.isAuthorized = (allowedRoles) => {
    return (req, res, next) => {
        try {
            logger.info(req.requestID, 'authorization', 'isAuthorized', 'Starting execution', { ipAddress: req.ip });

            if (allowedRoles.length === 0) {
                logger.info(req.request_id, 'authorization', 'isAuthorized',
                    'There are no roles :: User is authorized', { userID: req.userData.ID });
                return next();
            }

            for (let allowedRole of allowedRoles) {
                if (allowedRole === req.userData.role.codename) {
                    logger.info(req.request_id, 'authorization', 'isAuthorized', 'User is authorized', { userID: req.userData.ID, allowedRole });
                    return next();
                }
            }

            logger.warn(req.requestID, 'authorization', 'isAuthorized', 'User is not authorized',
                { userID: req.userData.ID, allowedRoles, userRole: req.userData.role });
            return res.status(401).json(commonResponses.unauthorized);
        } catch (error) {
            logger.info(req.requestID, 'authorization', 'isAuthorized', 'Server error', { error: error.toString() });
            return res.status(500).json(commonResponses.genericServerError);
        }
    }
};
