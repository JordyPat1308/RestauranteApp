const Usuario = require('../models/usuario.model');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign(
        { id },                     // Payload: el contenido que irá dentro del token
        process.env.JWT_SECRET,    // Clave secreta para firmar el token (debe estar en variables de entorno)
        { expiresIn: '30d' }       // Opciones: el token expirará en 30 días
    );
};


module.exports.createUsuario = async (request, response) => {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.status(400).json({ message: 'Missing fields, all are mandatory!' });
  }

  try {
    // Buscar si ya existe un usuario con ese email
    const userFound = await Usuario.findOne({ where: { email } });

    if (userFound) {
      return response.status(400).json({ message: 'User already exists' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = await Usuario.create({
      username,
      email,
      password: hashedPassword
    });

    // Responder con éxito
    return response.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser.id)
    });

  } catch (error) {
    return response.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Crear un nuevo usuario


module.exports.getAllUsuarios = async (_, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
}
module.exports.getUsuariobyId = async (req, res) => {
    try{
        const usuario = await Usuario.findOne({
            where: {
                id: req.params.id
            }
        });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}

module.exports.updateUsuario = async (req, res) => {
    try {
        const [updated] = await Usuario.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUsuario = await Usuario.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedUsuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}
module.exports.deleteUsuario = async (req, res) => {
    try {
        const deleted = await Usuario.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}
module.exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await Usuario.findOne({ where: { email } });

    //res.json({ message: 'Usuario encontrado: ', userFound });

    if (userFound && (await bcrypt.compare(password, userFound.password))) {
        res.json({
            message: 'Login User',
            email: userFound.email,
            username: userFound.username,
            token: generateToken(userFound.id)
        });
    } else {
        res.status(400).json({ message: 'Login Failed' });
    }
};

