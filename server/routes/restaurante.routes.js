const RestauranteController = require('../controllers/restaurante.controller');
const { protect } = require('../middlewares/autorization.middleware');

module.exports = function(app) {
    app.post("/restaurantes", protect, RestauranteController.CreateRestaurante);
    app.get("/restaurantes", RestauranteController.GetAllRestaurantes);
    app.get("/restaurantes/:id", RestauranteController.GetRestauranteById);
    app.put("/restaurantes/:id", protect, RestauranteController.UpdateRestaurante);
    app.delete("/restaurantes/:id", protect, RestauranteController.DeleteRestaurante);
}