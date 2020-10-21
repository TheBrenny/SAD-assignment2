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
router.get("/activities", async (_, res, next) => {
    try {
        let activities = await db.all("SELECT * FROM Activity;");
        res.json(activities);
    } catch (e) {
        next(e);
    }
});
router.get("/activities/parts", async (_, res, next) => {
    db.all("SELECT * FROM Activity WHERE parentID IS NULL;") // Don't need to construct tree for this one!
        .then(respond(res))
        .catch(dbError(next));
});
router.get("/activities/:pid(\\d+)", async (req, res, next) => {
    let pid = req.params.pid;
    db.all(`SELECT a.* FROM Activity a;`) // lets get all and use construct tree to cut shit off.
        .then(rows => Activity.constructTree(rows, 3))
        .then(tree => tree.find(t => t.activityID == pid))
        .then(r => {
            if (typeof r === "undefined") throw new Error("Part with id [" + pid + "] not found.");
            return r;
        })
        .then(respond(res))
        .catch(dbError(next));
});
router.get("/activities/topics", async (_, res, next) => {
    db.all(`SELECT a.* FROM Activity a;`) // lets get all and use construct tree to cut shit off.
        .then(rows => Activity.constructTree(rows, 2))
        .then(respond(res))
        .catch(dbError(next));
});
//#endregion

// ====== ATTENDANCE ======
//#region 
// router.use("/attendance", require("./attendance"));
router.get("/attendance", async (_, res) => {
    db.all("SELECT * FROM Attendance;")
        .then(respond(res))
        .catch(dbError(next));
});
//#endregion

// ====== GROUPS ======
//#region 
router.get("/groups", async (req, res, next) => {
    db.all("SELECT * FROM ClassGroup;")
        .then(respond(res))
        .catch(dbError(next));
});
router.post("/groups", async (req, res, next) => {
    Promise.resolve()
        .then(() => db.templateFromFile("group.new", ClassGroup.buildFromRow(req.body)))
        .then(db.exec)
        .then(success(res))
        .catch(dbError(next));
});
//#endregion

// ====== PLANNER ======
//#region 
router.get("/planner", async (req, res, next) => {
    success(res);
});
//#endregion

// ====== STUDENTS ======
//#region 
router.get("/students", async (_, res, next) => {
    db.all("SELECT * FROM Student;")
        .then(respond(res))
        .catch(dbError(next));
});
router.post("/students/new", async (req, res, next) => {
    let students = req.body;
    if (!Array.isArray(students)) students = [students];
    students.forEach(s => {
        s.studentID = null;
        s.groupID = parseInt(s.groupID || "-1");
    }); // enforce null and typecheck

    Promise.resolve()
        .then(() => db.templateFromFile("student.new", Student.buildFromRow(students)))
        .then(db.exec)
        .then(success(res))
        .catch(dbError(next));
});
router.get("/students/:id(\\d+)", async (req, res, next) => {
    db.get(`SELECT * FROM Student WHERE studentID = ${req.params.id};`)
        .then(respond(res))
        .catch(dbError(next));
});
router.get("/students/search/:query", async (req, res, next) => {
    db.all(`SELECT * FROM Student WHERE firstName LIKE "%${req.params.query}%" OR lastName LIKE "%${req.params.query}%"`)
        .then(respond(res))
        .catch(dbError(next));
});
//#endregion

// ====== EXTRA ======
//#region
if (!!process.env.DEMO_MODE) {
    router.get('/demo', async (_, res, next) => {
        Promise.resolve()
            .then(() => db.exec(db.sqlFromFile("demoEmpty")))
            .then(() => db.exec(db.sqlFromFile("demoFill")))
            .then(success(res))
            .catch(dbError(next));
    });
}

// A wrapper function to help keep good CRUD calls concise!
// Takes the response object.
function success(res) {
    return (d) => res.json(Object.assign({
        success: true,
    }, !!d ? {
        data: d
    } : {}));
}

// A wrapper function to help keep .then() calls concise!
// Takes the response object.
function respond(res) {
    return (r) => res.json(r);
}

// A wrapper function to help keep .catch() calls concise!
// Takes the "next" express function.
function dbError(next) {
    return (e) => next(Object.assign(e, {
        statusCode: 400
    }));
}
//#endregion

module.exports = router;