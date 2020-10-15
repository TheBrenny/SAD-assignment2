/*
 * The purpose of this file is to provide the API endpoints for the webapp. This
 * has nothing to do with the front end, only a simple RESTFUL API.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

const router = require('express').Router();
const db = require('../../db/db');

router.use("/activities", require("./activities"));
router.use("/attendance", require("./attendance"));
router.use("/groups", require("./groups"));
router.use("/planner", require("./planner"));
router.use("/students", require("./students"));

if (!!process.env.DEMO_MODE) {
    router.get('/demo', async (_, res, next) => {
        try {
            await db.exec(db.sqlFromFile("demoEmpty"));
            await db.exec(db.sqlFromFile("demoFill"));
            res.json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = router;