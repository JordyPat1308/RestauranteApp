const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Restaurantes = require('./restaurante.model');
const TipoComida = require('./tipocomida.model');

const Menu = sequelize.define('menu', {
    menuDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    restauranteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurantes,
            key: '_id'
        }
    },
    tipoComidaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoComida,
            key: '_id'
        }
    }
}, {
    timestamps: false
});

// Definir las asociaciones
Menu.belongsTo(Restaurantes, { 
    foreignKey: 'restauranteId',
    as: 'Restaurante'
});

Menu.belongsTo(TipoComida, { 
    foreignKey: 'tipoComidaId',
    as: 'TipoComida'
});

// Asociaciones many-to-many
Restaurantes.belongsToMany(TipoComida, { 
    through: Menu, 
    foreignKey: 'restauranteId', 
    otherKey: 'tipoComidaId' 
});

TipoComida.belongsToMany(Restaurantes, { 
    through: Menu, 
    foreignKey: 'tipoComidaId', 
    otherKey: 'restauranteId' 
});

module.exports = Menu;