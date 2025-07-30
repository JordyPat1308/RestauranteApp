require("dotenv").config();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

module.exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization.split(' ')[1];
            console.log('Token extraído: ', token);

            // se verifica el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // agregamos a cada petición información del usuario - excepto el password
            // (recuperado con base en el _id contenido en el payload del token)
            req.user = await Usuario.findOne({ 
                where: { id: decoded.id },
                attributes: { exclude: ['password'] } // Excluir password por seguridad
            });
            
            if (!req.user) {
                return res.status(401).json({ message: 'User not found!' });
            }
            
            next();
        } catch (error) {
            console.error('Error en middleware de autenticación:', error);
            return res.status(401).json({ message: 'Not authorized, token failed!' });
        }
    } else {
        // si no se tiene un token de portador, entonces no estará autorizado
        return res.status(401).json({ message: 'Not authorized, no token provided!' });
    }
};
