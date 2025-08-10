const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs')


const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// views
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));



// routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes)
const protectedRoutes = require('./routes/protected')
app.use('/protected', protectedRoutes)
const mainRoutes = require('./routes/main')
app.use('/', mainRoutes)

// mongoose connect
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB ulandi'))
    .catch(err => console.error('MongoDB xato:', err));

app.listen(3000, () => {
    console.log('server ulandi')
})