const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./configs/logger");
const env = require("./configs/index");
const handleErrors = require("./routes/middlewares/handleError");

const auth = require("./routes/auth");
const spell = require("./routes/spell");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/spell", spell);

app.listen(8000, () => {
    logger.info("server started");
});

app.use(handleErrors);
