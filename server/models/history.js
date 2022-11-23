const db = require("../configs/db");

const NOT_FOUND = "NOT_FOUND";

module.exports = {
    findAllHistoryByUserId: async (userId) => {
        const sqlSelect =
            "SELECT id, title FROM history WHERE user_id = ? ORDER BY id DESC";
        const params = [userId];
        const [rows] = await db.query(sqlSelect, params);
        return rows;
    },

    createHistory: async (userId, title, text) => {
        const sqlInsert =
            "INSERT INTO history (user_id, title, text) VALUES (?, ?, ?)";
        const params = [userId, title, text];
        const [rows] = await db.queryWithTransaction(sqlInsert, params);
    },
};
