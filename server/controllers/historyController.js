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

exports.findAll = async (req, res, next) => {
    try {
        const data = await historyService.findAll(res);
        return res.status(200).json({
            success: true,
            message: "검사 결과 리스트 조회 성공",
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

exports.findHistoryByUserIdAndHistoryId = async (req, res, next) => {
    try {
        const data = await historyService.findHistoryByUserIdAndHistoryId(
            req,
            res
        );
        return res.status(200).json({
            success: true,
            message: "검사 결과 조회 성공",
            data: data,
        });
    } catch (err) {
        next(err);
    }
};
