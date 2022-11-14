const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const envs = {
    JWT_SECRET: env.JWT_SECRET,
};

module.exports = envs;
