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
const { userExtractor, adminExtractor } = require('./middleware/auth');
const { MONGO_URI } = require('./config');

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny')); // Mantenemos el logger de Morgan

// Rutas frontend
app.use('/', express.static(path.resolve(__dirname, 'views', 'Home')));
app.use('/signup', express.static(path.resolve(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/Pago', express.static(path.resolve(__dirname, 'views', 'Pago')));
app.use('/Citasave', express.static(path.resolve(__dirname, 'views', 'Citasave')));
app.use('/ABarberP', express.static(path.resolve(__dirname, 'views', 'ABarberP')));
app.use('/ABarber', express.static(path.resolve(__dirname, 'views', 'ABarber')));
app.use('/Admin', express.static(path.resolve(__dirname, 'views', 'Admin')));
app.use('/Components', express.static(path.resolve(__dirname, 'views', 'Components')));
app.use('/images', express.static(path.resolve(__dirname, 'img')));
app.use('/verify/:id/:token', express.static(path.resolve(__dirname, 'views', 'verify')));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/agenda', agendaRouter);
app.use('/api/services', adminExtractor, servicesRouter); // Middleware adminExtractor aplicado primero
app.use('/api/citas', adminExtractor, citasRouter); // Middleware adminExtractor aplicado primero
app.use('/api/services', userExtractor, servicesRouter);
app.use('/api/citas', userExtractor, citasRouter);

module.exports = app;