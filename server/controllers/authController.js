const authService = require("../services/authService");

exports.login = async (req, res, next) => {
    try {
        const data = await authService.login(req);
        return res.status(200).cookie("accessToken", data.data).json({
            success: true,
            message: "로그인 성공",
            data: data,
        });
    } catch (err) {
        next(err);
    }
};
