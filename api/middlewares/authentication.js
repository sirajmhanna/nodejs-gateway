const logger = require('../../helpers/winston');
const nodeFetch = require('node-fetch');
const commonResponses = require('../../helpers/common-responses');

/**
 * Access Token Validation Middleware
 * @param { Object } req 
 * @param { Object } res 
 * @param { Object } next 
 * @returns { Object }
 */
exports.isAuthenticated = async (req, res, next) => {
    try {
        logger.info(req.requestID, 'authentication', 'isAuthenticated', 'Staring execution', {});

        if (req.headers.authorization === undefined || req.headers.authorization.length === 0) {
            logger.error(req.requestID, 'authentication', 'isAuthenticated', 'Authorization token is undefined', {});
            return res.status(400).json(commonResponses.somethingWentWrong);
        }

        logger.info(req.requestID, 'authentication',
            'isAuthenticated', 'Calling authentication service', { path: '/api/authentication/tokens/access/validate' });
        let response = await nodeFetch(process.env.AUTHENTICATION_SERVICE_URL + '/api/authentication/token/access/validate',
            {
                method: 'POST',
                body: JSON.stringify({
                    requestID: req.requestID,
                    accessToken: req.headers.authorization
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        response = await response.json();

        if (!response.data.isAccessTokenValid) {
            logger.warn(req.requestID, 'authentication', 'isAuthenticated', 'Access token is not valid', { response });
            return res.status(401).json(commonResponses.unauthorized);
        }

        logger.info(req.requestID, 'authentication', 'isAuthenticated', 'Access token is valid :: Returning promise next()', { response });
        req.userData = response.data.user
        return next();
    } catch (error) {
        logger.error(req.requestID, 'authentication', 'isAuthenticated', 'Server Error', { error: error.toString() });
        return res.status(500).json(commonResponses.genericServerError);
    }
};
