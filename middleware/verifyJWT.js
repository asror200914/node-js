require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function verifyJWT(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.redirect('/');
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token noto‘g‘ri yoki muddati o‘tgan' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyJWT;