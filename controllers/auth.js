const User = require('../models/user');  // user model joylashgan joyga qarab yo'lni o'zgartiring
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async function signup(req, res) {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email allaqachon ro‘yxatdan o‘tgan' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi' });
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
}



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Email yoki parol noto‘g‘ri' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Email yoki parol noto‘g‘ri' });

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000,
            sameSite: 'strict',
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });

        return res.redirect('/protected/test');
    } catch (error) {
        res.status(500).json({ message: 'Serverda ' });
    }
};

