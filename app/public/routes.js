/*
 * The purpose of this file is to register the front end endpoints. This is separated from the API endpoints for... i'm not too sure. Just because that's how i designed my workspace.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

const express = require('express');
const router = express.Router();
const nodeFetch = require("node-fetch");
const fetchTarget = require("../../config").serverInfo;
const fetchAPI = (req, path) => {
    let target = req.protocol + "://" + req.host + "/api" + path;
    return nodeFetch(target);
};

function getPageData(req, _) {
    let part = req.url.substring(1);
    let nextSlash = part.indexOf("/");
    if (nextSlash >= 0) part = part.substring(0, nextSlash);

    return {
        page: part
    };
}

router.get(['/', '/home'], (req, res) => {
    res.render('home', {
        ...getPageData(req, res),
    });
});
router.get('/students', async (req, res) => {
    res.render('students', {
        ...getPageData(req, res),
        students: await (fetchAPI(req, "/students").then(r => r.json()))
    });
});
router.get('/students/:id', async (req, res) => {
    res.render('student_get', {
        ...getPageData(req, res),
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

if (!!process.env.DEMO_MODE) {
    router.get('/demo', async (req, res) => {
        await fetchAPI(req, '/demo');
        res.redirect(303, '/');
    });
}

module.exports = router;