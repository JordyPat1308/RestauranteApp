const { DataTypes } = require('sequelize');


const sequelize = require('../config/sequelize.config');
 const Restaurantes = sequelize.define('restaurantes', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            notNull: {
                msg: "El ID del restaurante es obligatorio"
            },      
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "El nombre del restaurante es obligatorio"},
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "La dirección del restaurante es obligatoria"},
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "El tipo de restaurante es obligatorio"},
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: {msg: "La URL debe ser válida"}
        }
    },
    reputacion: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isFloat: {msg: "La reputación debe ser un número"},
            min: {
                args: [0],
                msg: "La reputación no puede ser menor que 0"
            },
            max: {
                args: [5],
                msg: "La reputación no puede ser mayor que 5"
            }
        }
    },

    
},{
    timestamps: false,
    tableName: 'restaurantes'
});
module.exports = Restaurantes;
// Es una plantilla o estrutura, en el esquema de la colleccion,definimos un grupo de caracterisitcas que debe cumplir
// Aqui definimos el tipo de dato, si es requerido, si tiene un maximo o minimo de caracteres, etc.


