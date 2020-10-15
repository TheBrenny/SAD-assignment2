const router = require('express').Router();
const db = require('../../db/db');
const {
    Attendance
} = require('../../db/schema');

router.get("/attendanceTypes", async (_, res) => {
    try {
        let attendanceTypes = await db.all("SELECT * FROM Attendance;");
        res.json(attendanceTypes);
    } catch (e) {
        next(e);
    }
});

module.exports = router;