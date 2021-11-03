const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// cookie-parser configuration
app.use(cookieParser());

// dotenv configuration
dotenv.config();

// morgan configuration
if(process.env.ENVIRONMENT !== 'production'){
    app.use(morgan('dev'));
}

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_BASE_URL);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Credential"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    return next();
});

// Server Routes
app.use('/api/server/', require('./api/routes/server'));

// Authentication Service
app.use(require('./api/routes/routers/authentication-service'));

module.exports = app;
