const hanspell = require("hanspell");
const logger = require("../configs/logger");

const checker = (sentence) => {
    return new Promise((resolve, reject) => {
        let result = [];
        let flag = false;
        let msg;
        let retry = 0;
        const end = function () {
            if (flag) {
                retry++;
                if (retry < 3) {
                    logger.warn("spell check retried");
                    flag = false;
                    hanspell.spellCheckByPNU(
                        sentence,
                        20000,
                        response,
                        end,
                        error
                    );
                } else {
                    logger.error(msg);
                    reject(msg);
                }
            } else {
                logger.info("spell checked");
                resolve(result);
            }
        };
        const error = function (err) {
            flag = true;
            msg = err;
        };
        const response = function (res) {
            result = result.concat(res);
        };
        hanspell.spellCheckByPNU(sentence, 20000, response, end, error);
    });
};

module.exports = checker;
