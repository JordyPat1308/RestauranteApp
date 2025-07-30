const MenuController = require('../controllers/menu.controller');

module.exports = function(app) {
    app.post("/menus", MenuController.CreateMenu);
    app.get("/menus/:restauranteId", MenuController.GetTiposComidasByRestaurante);
    app.get("/restaurantesbytipoc/:id", MenuController.GetRestaurantesbyTipoComida);
}