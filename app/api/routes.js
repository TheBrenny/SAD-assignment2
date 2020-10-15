/*
 * The purpose of this file is to provide the API endpoints for the webapp. This has nothing to do with the front end, only a simple RESTFUL API.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

const router = require('express').Router();

router.use("/attendance", require("./attendance"));
router.use("/students", require("./students"));
router.use("/activities", require("./activities"));
router.use("/planner", require("./planner"));
router.use("/groups", require("./groups"));

module.exports = router;