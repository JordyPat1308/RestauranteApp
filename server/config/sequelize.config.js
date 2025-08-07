const { Sequelize } = require('sequelize');
const username = 'root';
const password = 'root';
const bdd_name = 'RestaurantesDB';
const hostName = 'localhost';

// Función para crear la base de datos si no existe
const createDatabase = async () => {
    const initialSequelize = new Sequelize(`mysql://${username}:${password}@${hostName}`);
    
    try {
        await initialSequelize.query(`CREATE DATABASE IF NOT EXISTS ${bdd_name};`);
        console.log('BDD creada o ya existía');
        await initialSequelize.close();
    } catch (error) {
        console.error('Error al crear la BDD', error);
        process.exit(1);
    }
};

// Conectar a la base de datos específica
const sequelize = new Sequelize(bdd_name, username, password, {
    host: hostName,
    dialect: 'mysql',
    logging: false, // Desactivar logs de SQL
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Función para sincronizar los modelos
const syncDatabase = async () => {
    try {
        await createDatabase();
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente');
        
        await sequelize.sync({ force: true }); // Recrear tablas
        console.log('Base de datos sincronizada');
    } catch (error) {
        console.error('Error al sincronizar la BDD:', error);
        process.exit(1);
    }
};

// Ejecutar la sincronización
syncDatabase();

module.exports = sequelize;