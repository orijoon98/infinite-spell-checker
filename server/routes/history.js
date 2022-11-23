const express = require("express");
const historyController = require("../controllers/historyController");
const auth = require("./middlewares/authorization");

const router = express.Router();

router.use("/", auth.verifyToken);

router.post("/", historyController.create);

module.exports = router;
