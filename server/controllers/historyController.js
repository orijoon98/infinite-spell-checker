const historyService = require("../services/historyService");

exports.create = async (req, res, next) => {
    try {
        await historyService.create(req, res);
        return res.status(201).json({
            success: true,
            message: "검사 결과 저장 성공",
            data: null,
        });
    } catch (err) {
        next(err);
    }
};
