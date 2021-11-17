module.exports = {
  apps: [
    {
      name: `${process.env.ENVIRONMENT}-nodejs-gateway`,
      script: "./server.js",
      watch: false,
      env: {
        PORT: `${process.env.PORT}`,
        SERVICE_NAME: `${process.env.SERVICE_NAME}`,
        ENVIRONMENT: `${process.env.ENVIRONMENT}`,
        AUTHENTICATION_SERVICE_URL: `${process.env.AUTHENTICATION_SERVICE_URL}`,
        FRONTEND_BASE_URL: `${process.env.FRONTEND_BASE_URL}`,
      },
    },
  ],
};
