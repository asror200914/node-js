const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth'); // Controller joylashgan joyga qarab yo'l

router.post('/signup', signup);
router.post('/login', login);
router.get('/login', (req, res) => {
    res.render('login', { message: null })
})
router.get('/signup', (req, res) => {
    res.render('signup', { message: null })
})

module.exports = router;
