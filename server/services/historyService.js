const history = require("../models/history");
const { NotFound } = require("../utils/errors");

const NOT_FOUND = "NOT_FOUND";

exports.create = async (req, res) => {
    try {
        const userId = res.locals.userId;
        const title = req.body["title"];
        const text = req.body["text"];
        await history.createHistory(userId, title, text);
        return;
    } catch (err) {
        throw err;
    }
};

exports.findAll = async (res) => {
    try {
        const userId = res.locals.userId;
        const histories = await history.findAllHistoryByUserId(userId);
        console.log(histories);
        return histories;
    } catch (err) {
        throw err;
    }
};

exports.findHistoryByUserIdAndHistoryId = async (req, res) => {
    try {
        const userId = res.locals.userId;
        const historyId = req.params.historyId;
        const historyInfo = await history.findHistoryByUserIdAndHistoryId(
            userId,
            historyId
        );
        if (historyInfo === NOT_FOUND) {
            throw new NotFound("존재하지 않는 history 입니다.");
        }
        return historyInfo;
    } catch (err) {
        throw err;
    }
};
