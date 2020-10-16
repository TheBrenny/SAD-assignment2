/*
 * The purpose of this file is to provide the API endpoints for the webapp. This
 * has nothing to do with the front end, only a simple RESTFUL API.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

// ====== THIS IS THE BACK END API ======

const router = require('express').Router();
const db = require('../../db/db');
const {
    Schema,
    Activity,
    ActivityCompleted,
    Attendance,
    AttendanceRecord,
    Student,
    ClassGroup
} = require('../../db/schema');

// ====== ACTIVITIES ======
//#region 
// router.use("/activities", require("./activities"));
router.get("/activities", async (_, res, next) => {
    try {
        let activities = await db.all("SELECT * FROM Activity;");
        res.json(activities);
    } catch (e) {
        next(e);
    }
});
router.get("/activities/parts", async (_, res, next) => {
    try {
        let activities = await db.all("SELECT * FROM Activity WHERE parentID IS NULL;");
        res.json(activities);
    } catch (e) {
        next(e);
    }
});
router.get("/activities/:pid(\\d+)", async (_, res, next) => {
    let part = await db.get(`SELECT * FROM Activity WHERE parentID IS NULL AND activityID = ${req.params.pid};`);

});
router.get("/activities/topics", async (_, res, next) => {
    let parts = `SELECT * FROM Activity WHERE parentID IS NULL`;
    try {
        let activities = await db.all(`SELECT a.* FROM Activity a LEFT JOIN (${parts}) AS p WHERE a.parentID = p.activityID;`);
        res.json(activities);
    } catch (e) {
        next(e);
    }
});
//#endregion

// ====== ATTENDANCE ======
//#region 
// router.use("/attendance", require("./attendance"));
router.get("/attendance", async (_, res) => {
    try {
        let types = await db.all("SELECT * FROM Attendance;");
        res.json(types);
    } catch (e) {
        next(e);
    }
});
//#endregion

// ====== GROUPS ======
//#region 
router.get("/groups", async (req, res, next) => {
    try {
        let groups = await db.all("SELECT * FROM ClassGroup;");
        res.json(groups);
    } catch (e) {
        next(e);
    }
});
router.post("/groups", async (req, res, next) => {
    try {
        let group = ClassGroup.buildFromRow(req.body);
        let sqlQuery = db.templateFromFile("group.new", group);
        await db.exec(sqlQuery);
        res.json(group);
    } catch (e) {
        next(e);
    }
});
//#endregion

// ====== PLANNER ======
//#region 
router.use("/planner", require("./planner"));
//#endregion

// ====== STUDENTS ======
//#region 
router.get("/students", async (_, res, next) => {
    db.all("SELECT * FROM Student;").then(r => res.json(r)).catch(next);
});
router.post("/students", async (req, res, next) => {
    let students = Student.buildFromRow(req.body);
    // students.studentID = "NULL"; // enforce a "null"ed studentID
    let sqlQuery = db.templateFromFile("student.new", students);
    db.exec(sqlQuery).then(() => res.json(students)).catch((e) => next(dbError(e)));
});
router.get("/students/:id", async (req, res, next) => {
    db.get(`SELECT * FROM Student WHERE studentID = ${req.params.id};`).then(r => res.json(r)).catch(next);
});
//#endregion

// ====== EXTRA ======
//#region
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

function dbError(e) {
    return Object.assign(e, {
        statusCode: 400
    });
}

//#endregion

module.exports = router;