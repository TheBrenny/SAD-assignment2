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