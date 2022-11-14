const env = require("../configs/index");
const jwt = require("jsonwebtoken");

const axios = require("axios");
const { JWT_SECRET } = env;

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
        console.log(socialId);
        const userId = 1;
        const token = jwt.sign({ userId: userId }, JWT_SECRET, {
            expiresIn: "365d",
        });
        return { status: 200, data: token };
    } catch (err) {
        return { status: 500, data: err };
    }
};
