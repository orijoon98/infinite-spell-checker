const checker = require("../utils/checker");

exports.check = async (req) => {
    try {
        const result = await checker(req.body["sentence"]);
        return result;
    } catch (err) {
        throw err;
    }
};
