const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const envs = {
    NODE_ENV: env.NODE_ENV,
    DB_HOST: env.DB_HOST,
    DB_USER: env.DB_USER,
    DB_PASSWORD: env.DB_PASSWORD,
    DB_PORT: env.DB_PORT,
    DB_NAME: env.DB_NAME,
    DB_DEV_HOST: env.DB_DEV_HOST,
    DB_DEV_USER: env.DB_DEV_USER,
    DB_DEV_PASSWORD: env.DB_DEV_PASSWORD,
    DB_DEV_NAME: env.DB_DEV_NAME,
    JWT_SECRET: env.JWT_SECRET,
};

module.exports = envs;
