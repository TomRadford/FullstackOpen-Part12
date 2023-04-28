const express = require("express");
const { getAsync } = require("../redis");
const router = express.Router();

router.get("/", async (req, res) => {
	res.send({
		added_todos: parseInt(await getAsync('added_todos'))
	})
});

module.exports = router;
