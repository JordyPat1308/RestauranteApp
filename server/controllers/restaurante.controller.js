const Restaurantes = require('../models/restaurante.model');

module.exports.CreateRestaurante = async (request, response) => {
    const { nombre, direccion, tipo, url, reputacion } = request.body;
    try {
        const user = await Restaurantes.create({ nombre, direccion, tipo, url, reputacion });
        response.json(user);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo crear el usuario' });
        // response.status(500).json(err);
    }
};
module.exports.GetAllRestaurantes = async (_, response) => {
    try {
        const restaurantes = await Restaurantes.findAll();
        response.json(restaurantes);
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener los restaurantes' });
    }
}
module.exports.GetRestauranteById = async (request, response) => {
    try {
        const restaurante = await Restaurantes.findOne({
            where: {
                _id: request.params.id
            }});
        if (restaurante) {
            response.json(restaurante);
        } else {
            response.status(404).json({ message: 'Restaurante no encontrado' });
        }
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener el restaurante' });
    }
}
module.exports.UpdateRestaurante = async (request, response) => {
    try {
        const [updated] = await Restaurantes.update(request.body, {
            where: { _id: request.params.id }
        });
        if (updated) {
            const updatedRestaurante = await Restaurantes.findOne({ where: { _id: request.params.id } });
            response.status(200).json(updatedRestaurante);
        } else {
            response.status(404).json({ message: 'Restaurante no encontrado' });
        }
    } catch (err) {
        response.status(500).json({ message: 'Error al actualizar el restaurante' });
    }
}
module.exports.DeleteRestaurante = async (request, response) => {
    try {
        const deleted = await Restaurantes.destroy({
            where: { _id: request.params.id }
        });
        if (deleted) {
            response.status(204).send();
        } else {
            response.status(404).json({ message: 'Restaurante no encontrado' });
        }
    } catch (err) {
        response.status(500).json({ message: 'Error al eliminar el restaurante' });
    }
}