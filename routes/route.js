const express = require("express");
const router = express.Router();

const { getAllTransactions } = require("../controllers/tasks");

router.route("/").get(getAllTransactions);

module.exports = router;
