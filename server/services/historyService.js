const NOT_FOUND = "NOT_FOUND";
const history = require("../models/history");

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
