const express = require("express");
const router = express.Router();

const configs = require("../util/config");
const { setAsync, getAsync } = require("../redis");

/* GET index data. */
router.get("/", async (req, res) => {
  const visits = parseInt(await getAsync("visit_count"));
  res.send({
    ...configs,
    visits,
  });
  await setAsync("visit_count", (visits + 1).toString());
});

module.exports = router;
