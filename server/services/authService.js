const env = require("../configs/index");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const user = require("../models/user");
const { JWT_SECRET } = env;
const NOT_FOUND = "NOT_FOUND";

exports.login = async (req) => {
    try {
        const kakaoResponse = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
                headers: {
                    Authorization: `Bearer ${req.body.accessToken}`,
                },
            }
        );
        const socialId = kakaoResponse.data.id;
        let userId = await user.findUserIdBySocialId(socialId);
        if (userId == NOT_FOUND) {
            await user.createUser(socialId);
            userId = await user.findUserIdBySocialId(socialId);
        }
        const token = jwt.sign({ userId: userId }, JWT_SECRET, {
            expiresIn: "365d",
        });
        return token;
    } catch (err) {
        throw err;
    }
};
