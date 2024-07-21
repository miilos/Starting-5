const express = require("express");
const lineupController = require("../controllers/lineupController");

const router = express.Router();

router
  .route("/lineups")
  .get(lineupController.getAllLineups)
  .post(lineupController.createLineup);

router.route("/lineups/:name").get(lineupController.getLineupsByName);

router.route("/lineups/user/:user").get(lineupController.getLineupsByUser);

module.exports = router;
