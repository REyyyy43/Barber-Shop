const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');

usersRouter.post('/', async (request , response) => {
     const { name, email, password } = request.body;
    
     if (!name || !email || !password) {
        return response.status(400).json({error: 'Todos los espacios son requeridos'})
     }

     const userExist = await User.findOne({ email });

if (userExist) {
    return response.status(400).json({error: 'el email ya se encuentra en uso'})
}

const saltRounds = 10;
const passwordHash = await bcrypt.hash(password, saltRounds);

const newUser = new User({
 name,
 email,
 passwordHash,
 role: 'cliente'
});

const savedUser = await newUser.save();
const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, { 
expiresIn: '1d',
});

const transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true,
auth: {
// TODO: replace `user` and `pass` values from <https://forwardemail.net>
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
}); 

await transporter.sendMail({
from: process.env.EMAIL_USER, // sender address
to: savedUser.email, // list of receivers
subject: 'Verificacion de usuario', // Subject line
html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, //html body

});
return response.status(201).json('Usuario creado. Por favor verifica tu correo');
   
});

usersRouter.patch('/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200);
    
  
 } catch (error) {
 //encontrar el email del usuario
  const id = request.params.id;
  const { email } = await User.findById(id);

  //firmar el nuevo token
  const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, { 
    expiresIn: '1d',
    });
    
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
    }); 
    
    await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: 'Verificacion de usuario', // Subject line
    html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, //html body
    
    });
   }
 return response.status(400).json({error:'El link ya expiró. Se ha enviado un nuevo link de verificación a su correo'});

});

usersRouter.get('/verify/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const id = request.params.id;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decodedToken.id !== id) {
      throw new Error('Token inválido');
    }
    await User.findByIdAndUpdate(id, { verified: true });

    response.redirect('/login');
  } catch (error) {
    // Manejar errores
    response.status(400).json({ error: 'Error al verificar el correo electrónico' });
  }
});

 module.exports = usersRouter;