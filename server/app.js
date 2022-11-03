const express = require("express");
const cors = require("cors");
const logger = require("./config/logger");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
    logger.info("server started");
});
