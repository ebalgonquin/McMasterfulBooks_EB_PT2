const express = require("express");
const router = express.Router();

router.get("/orders", (req, res) => {
  res.json({ message: "Orders API working" });
});

module.exports = router;