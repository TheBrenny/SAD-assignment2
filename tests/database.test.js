/*
 * The purpose of this file is to test all Database Unit Tests using Jest.
 * 
 * Author: Jarod Brennfleck
 * 02 Oct 20
 */
require("../util_and_polyfill");
const test = require("ava");
const db = require("../db/db");

test.todo('testing db comes later when we have more things to test!');

// const dbPromise = require("./db/db");
// const schema = require("./db/schema");

// let students = [
//     new schema.Student(0, "Jarod", "Brennfleck", "1999-02-01", 0),
//     new schema.Student(1, "Josie", "Curtis", "2000-12-23", 0),
// ];

// let newStudents = dbPromise.templateFromFile("newStudent", students);

// console.log(newStudents);