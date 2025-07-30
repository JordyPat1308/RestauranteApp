const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize.config');
 const TipoComida = sequelize.define('tipocomida', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            notNull: {
                msg: "El ID es obligatorio"
            },      
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "El nombre es obligatorio"},
        }
    },
    paisOrigen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "El pais de origen es obligatorio"},
        }
    },
    
});
module.exports = TipoComida;
// Es una plantilla o estrutura, en el esquema de la colleccion,definimos un grupo de caracterisitcas que debe cumplir
// Aqui definimos el tipo de dato, si es requerido, si tiene un maximo o minimo de caracteres, etc.
