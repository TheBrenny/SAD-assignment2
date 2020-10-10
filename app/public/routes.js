/*
 * The purpose of this file is to register the front end endpoints. This is separated from the API endpoints for... i'm not too sure. Just because that's how i designed my workspace.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

const express = require('express');
const router = express.Router();

const pages = [
    "Home",
    "Students",
    "Attendance",
    "Activities",
    "Planner"
];

router.get('/*', (req, res) => {
    res.render('home', {
        nav: pages,
        page: req.url.substring(1)
    });
});

module.exports = router;