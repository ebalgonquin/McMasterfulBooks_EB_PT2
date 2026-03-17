const express = require("express");
const router = express.Router();

router.get("/stock", (req, res) => {
  res.json({ message: "Warehouse stock endpoint working" });
});

module.exports = router;