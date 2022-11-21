const db = require("../configs/db");

const NOT_FOUND = "NOT_FOUND";

module.exports = {
    findUserIdBySocialId: async (socialId) => {
        const sqlSelect = "SELECT id FROM user WHERE social_id = ?";
        const params = [socialId];
        const [rows] = await db.query(sqlSelect, params);
        if (rows.length < 1) {
            return NOT_FOUND;
        }
        return rows[0].id;
    },

    createUser: async (socialId) => {
        const sqlInsert = "INSERT INTO user (social_id) VALUES (?)";
        const params = [socialId];
        const [rows] = await db.queryWithTransaction(sqlInsert, params);
    },
};
