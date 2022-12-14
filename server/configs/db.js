const env = require("../configs/index");
const mysql = require("mysql2/promise");
const logger = require("../configs/logger");
const {
    NODE_ENV,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_NAME,
    DB_DEV_HOST,
    DB_DEV_USER,
    DB_DEV_PASSWORD,
    DB_DEV_NAME,
} = env;

/* @see : connection은 DB에 접속 -> SQL문 날림 -> 결과 받고 -> 연결 종료의 flow를 갖음
 * connection을 닫지 않으면 리소스를 불필요하게 낭비
 * pool.getConnection() -> connection.query() -> connection.release()
 */

const TAG_SUCCESS = "DB success create pool!!";
const TAG_PROTOCOL_CONNECTION_LOST = "Database connection was closed.";
const TAG_ER_CON_COUNT_ERROR = "Database has too many connections.";
const TAG_ECONNREFUSED = "Database connection was refused.";

let pool;
if (NODE_ENV === "development") {
    logger.info("connect dev database");
    pool = mysql.createPool({
        host: DB_DEV_HOST,
        user: DB_DEV_USER,
        password: DB_DEV_PASSWORD,
        port: DB_PORT,
        database: DB_DEV_NAME,
        connectionLimit: 50,
    });
} else {
    logger.info("connect product database");
    pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_NAME,
        connectionLimit: 50,
    });
}

logger.info(TAG_SUCCESS);

// eslint-disable-next-line valid-jsdoc
/**
 * TODO refactoring
 * TypeError [ERR_INVALID_ARG_TYPE]: The first argument must be of type string or an instance of , , or Array or an Array-like Object. Received undefined
 **/
const generateSQL = async (str, args) => {
    console.log(typeof str);
    let sqlQuery = "";
    await Promise.all(
        args.map(async (parameter) => {
            sqlQuery += mysql.format(str, parameter);
        })
    );
    return sqlQuery;
};

module.exports = {
    connection: async function () {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            return connection;
        } catch (err) {
            switch (err.code) {
                case "PROTOCOL_CONNECTION_LOST":
                    logger.error(TAG_PROTOCOL_CONNECTION_LOST);
                    break;
                case "ER_CON_COUNT_ERROR":
                    logger.error(TAG_ER_CON_COUNT_ERROR);
                    break;
                case "ECONNREFUSED":
                    logger.error(TAG_ECONNREFUSED);
                    break;
            }
        }
    },
    query: async function (query, ...args) {
        let rows;
        const connection = await this.connection(async (conn) => conn);

        if (!args) {
            rows = await connection.query(query);
        } else {
            let sqlQuery = "";
            await Promise.all(
                args.map(async (parameter) => {
                    sqlQuery += mysql.format(query, parameter);
                })
            );
            rows = await connection.query(sqlQuery);
        }
        connection.release();

        return rows;
    },
    queryWithTransaction: async function (query, ...args) {
        let rows;
        const connection = await this.connection(async (conn) => conn);

        await connection.beginTransaction();
        if (!args) {
            rows = await connection
                .query(query)
                .then(await connection.commit())
                .catch(await connection.rollback());
        } else {
            let sqlQuery = "";
            await Promise.all(
                args.map(async (parameter) => {
                    sqlQuery += mysql.format(query, parameter);
                })
            );
            rows = await connection
                .query(sqlQuery)
                .then(await connection.commit())
                .catch(await connection.rollback());
        }
        connection.release();
        return rows;
    },
};
