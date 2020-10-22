/*
 * The purpose of this file is to test all Database Unit Tests using Jest.
 * 
 * Author: Jarod Brennfleck
 * 02 Oct 20
 */
const test = require("ava");
require("../util_and_polyfill");
const db = require("../db/db");
const schema = require("../db/schema");

let failFast = false;

test.before("clean and install", async t => {
    t.regex((await db).config.filename, /.*?test\.sqlite$/, "not using the test db!");
    db.exec(db.sqlFromFile("clean"));
    db.exec(db.sqlFromFile("install"));
});

test.serial("sql templates", t => {
    let students = [
        new schema.Student(0, "Jarod", "Brennfleck", "1999-02-01", 0),
        new schema.Student(1, "Josie", "Curtis", "2000-12-23", 0),
    ];

    let newStudents = db.templateFromFile("student.new", students);
    let target = 'INSERT INTO Student (studentID, firstName, lastName, dob, groupID) VALUES (0, "Jarod", "Brennfleck", DATE("1999-02-01"), 0) , (1, "Josie", "Curtis", DATE("2000-12-23"), 0) ;';

    t.is(newStudents, target);

    if (!t.passed) failFast = "sql template couldn't be trusted";
});

test("insert students", async t => {
    if (failFast !== false) return t.fail(failFast);

    let students = [
        new schema.Student(0, "Jarod", "Brennfleck", "1999-02-01", 0),
        new schema.Student(1, "Josie", "Curtis", "2000-12-23", 0),
        new schema.Student(2, "Josie", "Curtis", "2001-10-13", 0),
        new schema.Student(3, "Josie", "Curtis", "2002-11-15", 0),
    ];

    let newStudents = db.templateFromFile("student.new", students);

    await t.notThrowsAsync(db.exec(newStudents));
});

test("no duplicate PKs", async t => {
    if (failFast !== false) return t.fail(failFast);

    let students = [
        new schema.Student(0, "Jarod", "Brennfleck", "1999-02-01", 0),
        new schema.Student(0, "Josie", "Curtis", "2002-11-15", 0),
    ];

    let newStudents = db.templateFromFile("student.new", students);

    await t.throwsAsync(db.exec(newStudents));
});

test.after.always("clean db", async (_) => {
    await db.close();
});