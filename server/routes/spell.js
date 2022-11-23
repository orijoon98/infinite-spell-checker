const express = require("express");
const spellController = require("../controllers/spellController");
const auth = require("./middlewares/authorization");

const router = express.Router();

router.use("/", auth.verifyToken);

router.post("/check", spellController.check);

module.exports = router;
