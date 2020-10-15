const express = require('express');
const router = express.Router();

// 404
router.use((req, res, next) => {
    res.status(404);
    const error = new Error(`404 Not Found. Could not ${req.method.toLowerCase()} ${req.url}`);
    next(error);
});

router.use((err, req, res, __) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    req.headers.accept = req.headers.accept.replaceAll(/\*\/\*(;q=.+?|\s+?)(,|$)/g, "");

    let e = {
        statusCode: statusCode,
        message: err.message
    };

    if (req.accepts("text/html")) {
        res.render("error", e);
    } else if (req.accepts("application/json")) {
        res.json(e);
    }

    res.end();
});

module.exports = router;