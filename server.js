/*const express= require('express');
const app = express();
const port = 8000;
const restaurantes= [
        { id: 1, nombre: 'Restaurante EPN', ubicacion: 'Ciudad A' },
        { id: 2, nombre: 'Restaurante Indoamerica', ubicacion: 'Ciudad B' },
        { id: 3, nombre: 'Restaurante Espiritu santo', ubicacion: 'Ciudad C' },
        { id: 4, nombre: 'Restaurante insfor', ubicacion: 'Ciudad D' },
        { id: 5, nombre: 'Restaurante utel', ubicacion: 'Ciudad E' }
    ]

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/restaurantes',(_,res)=>{
    res.json(restaurantes);
});

app.get('/restaurantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (id<=0 || id>restaurantes.length){ 
        res.status(404).send('Restaurante no encontrado');
    } else {
        const restaurante = restaurantes.find(r => r.id === id);
        if (restaurante) {
            res.json(restaurante);
        } else {
            res.status(404).send('Restaurante no encontrado');
        }
    }
});

app.post('/restaurantes', (req, res) => {
    const nuevoRestaurante = req.body;
    restaurantes.push(nuevoRestaurante);
    res.status(201).json(nuevoRestaurante);
});

app.put('/restaurantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id <0 || id >= restaurantes.length) {
        return res.status(404).send('Restaurante no encontrado');
    } else{
      restaurantes[id] = req.body;
      res.json(restaurantes[id]);
    }
    
});

app.delete('/restaurantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= restaurantes.length) {
        return res.status(404).send('Restaurante no encontrado');
    } else {
        restaurantes.splice(id, 1);
        res.status(204).send();
    }
});


app.listen(port, () => {
  console.log("server.js escuchando en el puerto " + port);
});*/

 const express = require('express')
 const app = express();
const cors = require('cors');
 const port = 8000;
 require('./serverMysql/config/sequelize.config')
 app.use(cors()); // Habilitar CORS para todas las rutas
 app.use(express.json()); // Middleware para parsear JSON en el cuerpo de la solicitud
 app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios
 const allRestauranteRoutes = require('./serverMysql/routes/restaurante.routes');
 allRestauranteRoutes(app);
const allTipoComidaRoutes = require('./serverMysql/routes/tipocomida.routes');
allTipoComidaRoutes(app);
const allMenuRoutes = require('./serverMysql/routes/menu.routes');
allMenuRoutes(app);
const allUsuarioRoutes = require('./serverMysql/routes/usuario.routes');
allUsuarioRoutes(app);
 app.listen(port,()=>{
    console.log("Server corriendo en el puerto: ",port);
 }) 