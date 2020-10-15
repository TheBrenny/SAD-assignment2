const router = require('express').Router();
const db = require('../../db/db');
const {
    Student
} = require('../../db/schema');

router.get("/", async (_, res, next) => {
    try {
        let students = await db.all("SELECT * FROM Student;");
        res.json(students);
    } catch (e) {
        next(e);
    }
});
router.post("/", async (req, res, next) => {
    try {
        let students = Student.buildFromRow(req.body);
        let sqlQuery = db.templateFromFile("student.new", students);
        await db.exec(sqlQuery);
        res.json(students);
    } catch (e) {
        next(e);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        let students = await db.get(`SELECT * FROM Student WHERE studentID = ${req.params.id};`);
        res.json(students);
    } catch (e) {
        next(e);
    }
});

module.exports = router;