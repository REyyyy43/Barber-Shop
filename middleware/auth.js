const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userExtractor = async (request, response, next) => {
    try {
        const userToken = request.cookies?.userAccessToken;
        if (!userToken) {
            return response.status(401).send({ error: 'No se proporcionó un token de acceso para el usuario.' });
        }

        const decodedUser = jwt.verify(userToken, process.env.USER_ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedUser.id);
        if (!user) {
            return response.status(404).send({ error: 'Usuario no encontrado.' });
        }

        // Asignar el usuario al objeto request para que esté disponible en las rutas posteriores
        request.user = user;
        console.log('Usuario:', user);
        
        next();
    } catch (error) {
        console.error('Error al extraer el usuario:', error);
        return response.status(403).send({ error: 'Token de usuario inválido o expirado.' });
    }
};

const adminExtractor = async (request, response, next) => {
    try {
        const adminToken = request.cookies?.adminAccessToken;
        if (!adminToken) {
            return response.status(401).send({ error: 'No se proporcionó un token de acceso para el administrador.' });
        }

        const decodedAdmin = jwt.verify(adminToken, process.env.ADMIN_ACCESS_TOKEN_SECRET);
        const admin = await Admin.findById(decodedAdmin.id);
        if (!admin) {
            return response.status(404).send({ error: 'Administrador no encontrado.' });
        }

        // Asignar el administrador al objeto request para que esté disponible en las rutas posteriores
        request.admin = admin;
        console.log('Administrador:', admin);
        
        next();
    } catch (error) {
        console.error('Error al extraer el administrador:', error);
        return response.status(403).send({ error: 'Token de administrador inválido o expirado.' });
    }
};

module.exports = { userExtractor, adminExtractor };