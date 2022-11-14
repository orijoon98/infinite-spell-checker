const authService = require("../services/authService");

exports.login = async (req, res) => {
    const data = await authService.login(req);
    console.log(data);
    if (data.status == 200)
        return res
            .status(200)
            .cookie("accessToken", data.data)
            .send("로그인 성공");
    else return res.status(500).send(data.data);
};
