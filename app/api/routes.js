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
router.get("/activities/", async (req, res, next) => {
    res.redirect("/api/activities/depth/0");
});
router.get("/activities/depth/:depth(\\d+)", async (req, res, next) => {
    db.all(`SELECT * FROM Activity;`)
        .then(rows => Activity.constructTree(rows, req.params.depth))
        .then(respond(res))
        .catch(dbError(next, req));
});
router.get("/activities/:aid(\\d+)", async (req, res, next) => { // not implemented
    req.notImplemented = true;
    next();
    return;

    let aid = req.params.aid;
    db.all(`SELECT * FROM Activity;`) // lets get all and use construct tree to cut shit off.
        .then(rows => Activity.constructTree(rows))
        .then(tree => {

            // recursively find activity, then take the children, and
            // keep the parents. anything that is not direct bloodline
            // is excluded.

            let badge = tree.find(t => t.activityID == aid);
            if (typeof badge === "undefined") throw new Error("Activity with id [" + aid + "] not found.");
            return badge;
        })
        .then(respond(res))
        .catch(dbError(next, req));
});
router.get("/activities/completions", async (req, res, next) => {
    db.all(`SELECT * FROM ActivityCompleted;`)
        .then(respond(res))
        .catch(dbError(next, req));
});
router.post("/activities/completions/record", async (req, res, next) => {
    let completions = req.body;
    if (!Array.isArray(completions)) completions = [completions];

    Promise.resolve()
        .then(() => db.templateFromFile("activity.completed", ActivityCompleted.buildFromRow(completions)))
        .then(db.exec)
        .then(async () => {
            let changes = Array.from(completions);
            do {
                for (let c of changes) {
                    const acts = await db.get(db.templateFromFile("getActivitiesForStudent", {
                        student: c.student
                    })); // get all activities with completions using the student from this completion
                    c = acts.find(a => a.activityID == c.activity);
                    if (c === null) continue; // should this be actually be a 500 error?

                    let p = acts.find(a => a.activityID == c.parentID);
                    if (typeof p === "undefined") continue;
                    // TODO: FINISH THIS -- IT'S 0306 and I'm going to bed.
                    // lookup all children items (pID === p.id)
                    // if all mandatory and (0 optional items present OR 7 optional are ticked), then:
                    //     send an INSERT INTO
                    //     add p to changes array
                    // finally, splice c from changes array
                }
            } while (changes.length > 0);
        })
        // TODO: then(), we want to recursively (and fail-fast) check the parents to try tick them as complete
        .then(success(res))
        .catch(dbError(next, req));
});
//#endregion

// ====== ATTENDANCE ======
//#region 
router.get("/attendance", async (req, res, next) => {
    db.all("SELECT * FROM AttendanceRecord;")
        .then(respond(res))
        .catch(dbError(next, req));
});
router.get("/attendance/:sid(\\d+)", async (req, res, next) => {
    let sid = req.params.sid;

    db.all(`SELECT * FROM AttendanceRecord WHERE student = ${sid};`)
        .then(respond(res))
        .catch(dbError(next, req));
});
router.post("/attendance/record", async (req, res, next) => {
    let attendance = req.body;
    if (!Array.isArray(attendance)) attendance = [attendance];

    Promise.resolve()
        .then(() => db.templateFromFile("attendance.record", AttendanceRecord.buildFromRow(attendance)))
        .then(db.exec)
        .then(success(res))
        .catch(dbError(next, req));
});
router.put("/attendance/update", async (req, res, next) => {
    let attendance = req.body;
    if (!Array.isArray(attendance)) attendance = [attendance];

    Promise.resolve()
        .then(() => db.templateFromFile("attendance.update", AttendanceRecord.buildFromRow(attendance)))
        .then(db.exec)
        .then(success(res))
        .catch(dbError(next, req));
});
//#endregion

// ====== GROUPS ======
//#region 
router.get("/groups", async (req, res, next) => {
    db.all("SELECT * FROM ClassGroup;")
        .then(respond(res))
        .catch(dbError(next, req));
});
router.post("/groups", async (req, res, next) => {
    Promise.resolve()
        .then(() => db.templateFromFile("group.new", ClassGroup.buildFromRow(req.body)))
        .then(db.exec)
        .then(success(res))
        .catch(dbError(next, req));
});
//#endregion

// ====== PLANNER ======
//#region 
router.get("/planner", async (req, res, next) => { // not implemented
    req.notImplemented = true;
    next();
});
//#endregion

// ====== STUDENTS ======
//#region 
router.get("/students", async (req, res, next) => {
    db.all("SELECT * FROM Student;")
        .then(respond(res))
        .catch(dbError(next, req));
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
        .catch(dbError(next, req));
});
router.get("/students/:id(\\d+)", async (req, res, next) => {
    db.get(`SELECT * FROM Student WHERE studentID = ${req.params.id};`)
        .then(respond(res))
        .catch(dbError(next, req));
});
router.get("/students/:id(\\d+)/activities", async (req, res, next) => {
    let template = {
        student: req.params.id
    };

    db.get(db.templateFromFile("getActivitiesForStudent", template))
        .then(rows => Activity.constructTree(rows, 0))
        .then(respond(res))
        .catch(dbError(next, req));
});
router.get("/students/search/:query", async (req, res, next) => {
    db.all(`SELECT * FROM Student WHERE firstName LIKE "%${req.params.query}%" OR lastName LIKE "%${req.params.query}%"`)
        .then(respond(res))
        .catch(dbError(next, req));
});
//#endregion

// ====== EXTRA ======
//#region
if (!!process.env.DEMO_MODE) {
    router.get('/demo', async (req, res, next) => {
        Promise.resolve()
            .then(() => db.exec(db.sqlFromFile("demoEmpty")))
            .then(() => db.exec(db.sqlFromFile("demoFill")))
            .then(success(res))
            .catch(dbError(next, req));
    });
}

router.get("/*", async (req, res, next) => {
    if (!!req.notImplemented) {
        let e = new Error(`Path [${req.path}] not implemented yet!`);
        e.statusCode = 501;
        dbError(next, req)(e);
    } else next();
});

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
function dbError(next, req) {
    return (e) => next(Object.assign(e, {
        statusCode: e.statusCode || (req && req.method == "POST" ? 400 : 500) || 500
    }));
}
//#endregion

module.exports = router;