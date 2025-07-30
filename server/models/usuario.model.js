const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

// Definición del modelo Usuario
const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'El nombre de usuario es obligatorio'
            },
            len: {
                args: [3, 50],
                msg: 'El nombre de usuario debe tener entre 3 y 50 caracteres'
            },
            isAlphanumeric: {
                msg: 'El nombre de usuario solo puede contener letras y números'
            }
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'El email es obligatorio'
            },
            isEmail: {
                msg: 'Debe ser un email válido'
            },
            len: {
                args: [5, 100],
                msg: 'El email debe tener entre 5 y 100 caracteres'
            }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña es obligatoria'
            },
            len: {
                args: [6, 255],
                msg: 'La contraseña debe tener al menos 6 caracteres'
            }
        }
    }
}, {
    timestamps: false, // Agrega createdAt y updatedAt automáticamente
    
});


module.exports = Usuario;