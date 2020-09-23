const express = require('express');
const router = express.Router();

router.get('/*', (req, res) => {
    res.render('home', {
        url: req.url,
        time: new Date().toLocaleTimeString()
    });
});

module.exports = router;