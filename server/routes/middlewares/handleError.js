const { GeneralError } = require("../../utils/errors");
const logger = require("../../configs/logger");

const handleErrors = (err, req, res, next) => {
    logger.error(err);

    //* Custom Error
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = handleErrors;
