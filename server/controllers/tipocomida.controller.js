const TipoComida = require('../models/tipocomida.model');

module.exports.CreateTipoComida = async (request, response) => {
    const { nombre, paisOrigen } = request.body;
    try {
        const tipoComida = await TipoComida.create({ nombre, paisOrigen });
        response.json(tipoComida);
    } catch (err) {
        response.status(500).json({ message: 'No se pudo crear el tipo de comida' });
    }
}

module.exports.GetAllTipoComidas = async (_, response) => {
    try {
        const tipoComidas = await TipoComida.findAll();
        response.json(tipoComidas);
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener los tipos de comida' });
    }
}

module.exports.GetTipoComidaById = async (request, response) => {
    try {
        const tipoComida = await TipoComida.findOne({
            where: {
                _id: request.params.id
            }
        });
        if (tipoComida) {
            response.json(tipoComida);
        } else {
            response.status(404).json({ message: 'Tipo de comida no encontrado' });
        }
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener el tipo de comida' });
    }
}

module.exports.UpdateTipoComida = async (request, response) => {
    try {
        const [updated] = await TipoComida.update(request.body, {
            where: { _id: request.params.id }
        });
        if (updated) {
            const updatedTipoComida = await TipoComida.findOne({ where: { _id: request.params.id } });
            response.status(200).json(updatedTipoComida);
        } else {
            response.status(404).json({ message: 'Tipo de comida no encontrado' });
        }
    } catch (err) {
        response.status(500).json({ message: 'Error al actualizar el tipo de comida' });
    }
}
module.exports.DeleteTipoComida = async (request, response) => {
    try {
        const deleted = await TipoComida.destroy({
            where: { _id: request.params.id }
        });
        if (deleted) {
            response.status(204).send();
        } else {
            response.status(404).json({ message: 'Tipo de comida no encontrado' });
        }
    } catch (err) {
        response.status(500).json({ message: 'Error al eliminar el tipo de comida' });
    }
}