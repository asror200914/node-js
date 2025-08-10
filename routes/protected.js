const verifyJWT = require('../middleware/verifyJWT')
const express = require('express');
const router = express.Router();

router.get('/test', verifyJWT, (req, res) => {
    res.render('test', { message: `Salom, ${req.user.email}!` });
});

module.exports = router;