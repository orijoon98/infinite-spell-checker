const env = require("../../configs/index");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../../utils/errors");

const { JWT_SECRET } = env;

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            res.locals.userId = decoded.userId;
            next();
        } else {
            throw new Unauthorized("jwt decode 실패");
        }
    } catch (e) {
        next(new Unauthorized("jwt 인증 실패"));
    }
};
