const getEnv = require("./get-env");

const appEnv = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "3006"),
    BASE_URL: getEnv("BASE_URL", "http://localhost:3006"),
});

const config = appEnv();

module.exports = config;