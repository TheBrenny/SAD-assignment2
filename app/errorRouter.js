const express = require('express');
const router = express.Router();

// 404
router.use((req, res, next) => {
    res.status(404);
    const error = new Error(`404 Not Found. Could not find ${req.url}`);
    next(error);
});

router.use((err, _, res, __) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.render("error", {
        statusCode: statusCode,
        message: err.message
    });
});

module.exports = router;