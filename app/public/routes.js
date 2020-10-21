/*
 * The purpose of this file is to register the front end endpoints. This is separated from the API endpoints for... i'm not too sure. Just because that's how i designed my workspace.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

const express = require('express');
const router = express.Router();
const nodeFetch = require("node-fetch");

function fetchAPI(req, path) {
    let target = req.protocol + "://" + req.host + "/api" + path;
    return nodeFetch(target, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(r => r.json());
}

function getPageData(req, _) {
    let part = req.url.substring(1);
    let nextSlash = part.indexOf("/");
    if (nextSlash >= 0) part = part.substring(0, nextSlash);

    return {
        page: part
    };
}

// ====== HOME ======

router.get(['/', '/home'], (req, res) => {
    res.render('home', {
        ...getPageData(req, res),
    });
});

// ====== STUDENTS ======

router.get('/students', async (req, res) => {
    res.render('students', {
        ...getPageData(req, res),
        students: await (fetchAPI(req, "/students")),
        searchTerm: ""
    });
});
router.get("/students/search/:query", async (req, res) => {
    res.render('students', {
        ...getPageData(req, res),
        students: await (fetchAPI(req, "/students/search/" + req.params.query)),
        searchTerm: req.params.query
    });
});
router.get('/students/:id(\\d+)', async (req, res) => {
    res.render('student_get', {
        ...getPageData(req, res),
        student: await (fetchAPI(req, "/students/" + req.params.id))
    });
});
router.get('/students/new', async (req, res) => {
    res.render('student_new', {
        ...getPageData(req, res),
        groups: await (fetchAPI(req, "/groups"))
    });
});

// ====== ATTENDANCE ======

router.get('/attendance', (req, res) => {
    res.render('home', {
        ...getPageData(req, res),
    });
});

// ====== ACTIVITIES ======

router.get('/activities', (req, res) => {
    res.render('home', {
        ...getPageData(req, res),
    });
});

// ====== PLANNER ======

router.get('/planner', (req, res) => {
    res.render('planner', {
        ...getPageData(req, res),
    });
});

// ====== EXTRA ======

if (!!process.env.DEMO_MODE) {
    router.get('/demo', async (req, res) => {
        await fetchAPI(req, '/demo');
        res.redirect(303, '/');
    });
}

module.exports = router;