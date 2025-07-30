const Menu = require('../models/menu.model');

module.exports.CreateMenu = async (request, response) => {
    const {restauranteId, tipoComidaId} = request.body;
    try {
        const menu = await Menu.create({restauranteId, tipoComidaId});
        response.json(menu);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo crear el menú' });
    }
}

module.exports.GetTiposComidasByRestaurante = async (request, response) => {

    try {
        const tiposComidas = await Menu.findAll({
            where: { restauranteId: request.params.restauranteId },
            include: ['TipoComida']
        });
        response.json(tiposComidas);
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener los tipos de comida del restaurante' });
    }
}
module.exports.GetRestaurantesbyTipoComida = async (request, response) => {
    try {
        const restaurantes = await Menu.findAll({
            where: { tipoComidaId: request.params.tipoComidaId },
            include: ['Restaurante']
        });
        response.json(restaurantes);
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener los restaurantes por tipo de comida' });
    }
}
