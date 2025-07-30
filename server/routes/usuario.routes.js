const UsuarioController = require('../controllers/usuario.controller');
const {protect} = require('../middlewares/autorization.middleware');

module.exports = function(app){
    app.post("/usuarios", UsuarioController.createUsuario);
    app.get("/usuarios", UsuarioController.getAllUsuarios);
    app.get("/usuarios/:id", UsuarioController.getUsuariobyId);
    app.put("/usuarios/:id", UsuarioController.updateUsuario);
    app.delete("/usuarios/:id", UsuarioController.deleteUsuario);
    app.post("/usuarios/login", UsuarioController.loginUsuario);

};