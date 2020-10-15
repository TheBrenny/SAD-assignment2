/*
 * The purpose of this file is to register the front end endpoints. This is separated from the API endpoints for... i'm not too sure. Just because that's how i designed my workspace.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

const express = require('express');
const router = express.Router();

function getPageData(req, res) {
    return {
        page: req.url.substring(1),
    };
}

router.get(['/', '/home'], (req, res) => {
    res.render('home', {
        ...getPageData(req, res),
    });
});
router.get('/students', (req, res) => {
    res.render('students', {
        ...getPageData(req, res),
        students: []
    });
});
router.get('/attendance', (req, res) => {
    res.render('home', {
        ...getPageData(req, res),
    });
});
router.get('/activities', (req, res) => {
    res.render('home', {
        ...getPageData(req, res),
    });
});
router.get('/planner', (req, res) => {
    res.render('planner', {
        ...getPageData(req, res),
    });
});
module.exports = router;