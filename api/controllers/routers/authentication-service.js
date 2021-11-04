const logger = require('../../../helpers/winston');
const nodeFetch = require('node-fetch');
const commonResponses = require('../../../helpers/common-responses');

// Login Router
exports.login = async (req, res) => {
    try {
        logger.info(req.requestID, 'authentication-service', 'login', 'Starting execution :: Calling authentication service', { path: req.path, ipAddress: req.ip });
        let response = await nodeFetch(process.env.AUTHENTICATION_SERVICE_URL + req.path,
            {
                method: 'POST',
                body: JSON.stringify({
                    requestID: req.requestID,
                    email: req.body.email,
                    password: req.body.password,
                    ipAddress: req.ip
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        response = await response.json();

        if(response.status === 'success'){
            logger.info(req.body.requestID, 'authentication-service', 'login', 'Set refresh token in httpOnly secured cookie', {});
            res.cookie("refreshToken", response.refreshToken.refresh, {
                maxAge: ((1000) * response.refreshToken.time),
                httpOnly: true,
                sameSite: !process.env.ENVIRONMENT === "development",
                secure: !process.env.ENVIRONMENT === "development"
            });
            delete response.refreshToken;
        }
        
        logger.info(req.requestID, 'authentication-service', 'login', 'Returning response', {});
        return res.status(response.code).json(response);
    } catch (error) {
        logger.error(req.requestID, 'authentication-service', 'login', 'Server Error', { error: error.toString() });
        return res.status(500).json(commonResponses.genericServerError);
    }
};

// Logout Router
exports.logout = async (req, res) => {
    try {
        logger.info(req.requestID, 'authentication-service', 'logout', 'Starting execution :: Calling authentication service', { path: req.path, ipAddress: req.ip });
        let response = await nodeFetch(process.env.AUTHENTICATION_SERVICE_URL + req.path,
            {
                method: 'POST',
                body: JSON.stringify({
                    requestID: req.requestID,
                    userData: req.userData,
                    refreshToken: req.cookies['refreshToken']
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': req.headers.authorization
                }
            });
        response = await response.json();

        logger.info(req.requestID, 'authentication-service', 'logout', 'Returning response', { ipAddress: req.ip });
        return res.status(response.code).json(response);
    } catch (error) {
        logger.error(req.requestID, 'authentication-service', 'logout', 'Server Error', { error: error.toString() });
        return res.status(500).json(commonResponses.genericServerError);
    }
};

// Change Password Router
exports.changePassword = async (req, res) => {
    try {
        logger.info(req.requestID, 'authentication-service', 'changePassword', 'Starting execution :: Calling authentication service', { path: req.path, ipAddress: req.ip });
        let response = await nodeFetch(process.env.AUTHENTICATION_SERVICE_URL + req.path,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    requestID: req.requestID,
                    userData: req.userData,
                    currentPassword: req.body.currentPassword,
                    newPassword: req.body.newPassword
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        response = await response.json();

        logger.info(req.requestID, 'authentication-service', 'changePassword', 'Returning response', {});
        return res.status(response.code).json(response);
    } catch (error) {
        logger.error(req.requestID, 'authentication-service', 'changePassword', 'Server Error', { error: error.toString() });
        return res.status(500).json(commonResponses.serverError);
    }
};

// Request Reset Password Router
exports.requestResetPassword = async (req, res) => {
    try {
        logger.info(req.requestID, 'authentication-service', 'requestResetPassword', 'Starting execution :: Calling authentication service', { path: req.path, ipAddress: req.ip });

        let url = new URL(process.env.AUTHENTICATION_SERVICE_URL + req.path),
            params = {
                requestID: req.requestID,
                email: req.query.email,
                frontendBaseURL: process.env.FRONTEND_BASE_URL
            };
        await Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        let response = await nodeFetch(url,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
        response = await response.json();

        logger.info(req.requestID, 'authentication-service', 'requestResetPassword', 'Returning response', {});
        return res.status(response.code).json(response);
    } catch (error) {
        logger.error(req.requestID, 'authentication-service', 'requestResetPassword', 'Server Error', { error: error.toString() });
        return res.status(500).json(commonResponses.serverError);
    }
};
