require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const servicesRouter = require('./controllers/services');
const citasRouter = require('./controllers/citas');
const agendaRouter = require('./controllers/Agenda');
const logoutRouter = require('./controllers/logout');
const { userExtractor } = require('./middleware/auth');
const { MONGO_URI } = require('./config');



(async() => {

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a Mongo DB')
    } catch (error) {
        console.log(error);
    }
})()
app.use(cors());
app.use(express.json());
app.use(cookieParser());



// rutas frontend
app.use('/' , express.static(path.resolve('views' , 'Home')));
app.use('/signup' , express.static(path.resolve('views' , 'signup')));
app.use('/login' , express.static(path.resolve('views' , 'login')));
app.use('/Pago' , express.static(path.resolve('views' , 'Pago')));
app.use('/Citasave' , express.static(path.resolve('views' , 'Citasave')));
app.use('/ABarberP' , express.static(path.resolve('views' , 'ABarberP')));
app.use('/ABarber' , express.static(path.resolve('views' , 'ABarber')));
app.use('/Admin' , express.static(path.resolve('views' , 'Admin')));
app.use('/Components' , express.static(path.resolve('views' , 'Components')));
app.use('/images' , express.static(path.resolve('img')));
app.use('/verify/:id/:token' , express.static(path.resolve('views' , 'verify')));

app.use(morgan('tiny'));

//Rutas backend
app.use('/api/users' , usersRouter);
app.use('/api/login' , loginRouter);
app.use('/api/logout' , logoutRouter);
app.use('/api/agenda', agendaRouter);
app.use('/api/services', userExtractor, servicesRouter);
app.use('/api/citas',  userExtractor, citasRouter);

module.exports = app;