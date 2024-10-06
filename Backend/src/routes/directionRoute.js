const express = require("express");
const router = express.Router();
const { getRoute } = require("../controllers/directionController");

router.get("/", async (req, res) => {
  const response = await getRoute(req, res);
});

module.exports = router;
