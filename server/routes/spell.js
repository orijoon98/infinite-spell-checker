const express = require("express");
const spellController = require("../controllers/spellController");

const router = express.Router();

router.post("/check", spellController.check);

module.exports = router;
