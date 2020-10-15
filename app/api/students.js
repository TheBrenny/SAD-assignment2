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
        let obj = req.body;
        let newStudent = db.templateFromFile("student.new", obj);
        res.send(newStudent);
    } catch (e) {
        next(e);
    }
});
router.get("/get/:id", async (req, res, next) => {
    try {
        let students = await db.get(`SELECT * FROM Student WHERE studentID = ${req.params.id};`);
        res.json(students);
    } catch (e) {
        next(e);
    }
});

module.exports = router;