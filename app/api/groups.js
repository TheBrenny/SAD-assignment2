const router = require('express').Router();
const db = require('../../db/db');

router.get("/", async (req, res, next) => {
    try {
        let groups = await db.all("SELECT * FROM Attendance;");
        res.json(groups);
    } catch (e) {
        next(e);
    }
});

module.exports = router;