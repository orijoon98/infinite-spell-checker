const db = require("../configs/db");

const NOT_FOUND = "NOT_FOUND";

module.exports = {
    createHistory: async (userId, title, text) => {
        const sqlInsert =
            "INSERT INTO history (user_id, title, text) VALUES (?, ?, ?)";
        const params = [userId, title, text];
        const [rows] = await db.queryWithTransaction(sqlInsert, params);
    },
};
