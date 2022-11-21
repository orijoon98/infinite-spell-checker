const spellService = require("../services/spellService");

exports.check = async (req, res, next) => {
    try {
        const data = await spellService.check(req);
        return res.status(200).json({
            success: true,
            message: "맞춤법 검사 성공",
            data: data,
        });
    } catch (err) {
        next(err);
    }
};
