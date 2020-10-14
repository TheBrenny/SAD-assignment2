require("./util_and_polyfill");

const dbPromise = require("./db/db");
const schema = require("./db/schema");

let students = [
    new schema.Student(0, "Jarod", "Brennfleck", "1999-02-01", 0),
    new schema.Student(1, "Josie", "Curtis", "2000-12-23", 0),
];

let newStudents = dbPromise.templateFromFile("newStudent", students);

console.log(newStudents);