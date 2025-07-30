const TipoComidaController = require('../controllers/tipocomida.controller');
module.exports = function(app) {
    app.post("/tipocomida", TipoComidaController.CreateTipoComida);
    app.get("/tipocomida", TipoComidaController.GetAllTipoComidas);
    app.get("/tipocomida/:id", TipoComidaController.GetTipoComidaById);
    app.put("/tipocomida/:id", TipoComidaController.UpdateTipoComida);
    app.delete("/tipocomida/:id", TipoComidaController.DeleteTipoComida);
}