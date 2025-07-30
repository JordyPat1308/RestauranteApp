import './App.css';
import AllRestaurantes from './Componentes/AllRestaurantes';
import AllUsuarios from './Componentes/AllUsuarios';
import AllTipoComidas from './Componentes/AllTipoComidas';
import AllMenus from './Componentes/AllMenus';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './Componentes/Inicio';
import CrearRestauranteForm from './Componentes/CrearRestauranteForm';
import CrearUsuarioForm from './Componentes/CrearUsuarioForm';
import CrearTipoComidaForm from './Componentes/CrearTipoComidaForm';
import CrearMenuForm from './Componentes/CrearMenuForm';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import EditarRestauranteForm from './Componentes/EditarRestauranteForm';
import EditarUsuarioForm from './Componentes/EditarUsuarioForm';
import EditarTipoComidaForm from './Componentes/EditarTipoComidaForm';

function App(){

  const [lRestaurantes, setlRestaurantes] = useState([]);
  const [lUsuarios, setlUsuarios] = useState([]);
  const [lTipoComidas, setlTipoComidas] = useState([]);
  const [lMenus, setlMenus] = useState([]);

  useEffect(() => {
    // Cargar restaurantes
    axios.get('http://localhost:8000/restaurantes')
      .then(response => {
        setlRestaurantes(response.data);
      })
      .catch(error => {
        console.error("Error al cargar restaurantes:", error);
      });

    // Cargar usuarios
    axios.get('http://localhost:8000/usuarios')
      .then(response => {
        setlUsuarios(response.data);
      })
      .catch(error => {
        console.error("Error al cargar usuarios:", error);
      });

    // Cargar tipos de comida
    axios.get('http://localhost:8000/tipocomida')
      .then(response => {
        setlTipoComidas(response.data);
      })
      .catch(error => {
        console.error("Error al cargar tipos de comida:", error);
      });

    // Cargar menús - usando todos los menús en lugar de por restaurante
    axios.get('http://localhost:8000/menus')
      .then(response => {
        // Si la API solo devuelve menús por restaurante, necesitaremos ajustar esto
        // Por ahora asumimos que existe un endpoint para obtener todos los menús
        setlMenus(response.data);
      })
      .catch(error => {
        console.error("Error al cargar menús:", error);
        // Si no existe el endpoint, puedes comentar esta parte o crear un endpoint genérico
      });
  }, []);

  const addRestaurante = (nuevoRestaurante) => {
    axios.post('http://localhost:8000/restaurantes', nuevoRestaurante)
      .then(response => {
        setlRestaurantes([...lRestaurantes, response.data]);
      })
      .catch(error => {
        console.error("Error al agregar el restaurante:", error);
      });

  }
  const eliminarRestaurante = (id) => {

    axios.delete("http://localhost:8000/restaurantes/" + id)
      .then(() => {
        setlRestaurantes(lRestaurantes.filter(rest => rest.id !== id));
        console.log("Restaurante eliminado con éxito");
        })
      .catch(error => {
        console.error("Error al eliminar el restaurante:", error);
      })
  
  };
  const actualizarRestaurante = (restauranteActualizado) => {
    console.log("Restaurante a actualizar:", restauranteActualizado);
    console.log("ID del restaurante a actualizar:", restauranteActualizado._id);
    axios.put("http://localhost:8000/restaurantes/"+ restauranteActualizado._id, restauranteActualizado)
      .then(response => {
        setlRestaurantes(lRestaurantes.map(rest => rest._id === restauranteActualizado._id ? response.data : rest));
      })
      .catch(error => {
        console.error("Error al actualizar el restaurante:", error);
      });
  };

  // ============== MÉTODOS CRUD PARA USUARIOS ==============
  
  const addUsuario = (nuevoUsuario) => {
    axios.post('http://localhost:8000/usuarios', nuevoUsuario)
      .then(response => {
        setlUsuarios([...lUsuarios, response.data]);
        console.log("Usuario agregado con éxito");
      })
      .catch(error => {
        console.error("Error al agregar el usuario:", error);
      });
  }

  const eliminarUsuario = (id) => {
    axios.delete("http://localhost:8000/usuarios/" + id)
      .then(() => {
        setlUsuarios(lUsuarios.filter(usuario => usuario.id !== id));
        console.log("Usuario eliminado con éxito");
      })
      .catch(error => {
        console.error("Error al eliminar el usuario:", error);
      });
  };

  const actualizarUsuario = (usuarioActualizado) => {
    console.log("Usuario a actualizar:", usuarioActualizado);
    console.log("ID del usuario a actualizar:", usuarioActualizado.id);
    axios.put("http://localhost:8000/usuarios/" + usuarioActualizado.id, usuarioActualizado)
      .then(response => {
        setlUsuarios(lUsuarios.map(usuario => usuario.id === usuarioActualizado.id ? response.data : usuario));
        console.log("Usuario actualizado con éxito");
      })
      .catch(error => {
        console.error("Error al actualizar el usuario:", error);
      });
  };

  // ============== MÉTODOS CRUD PARA TIPO COMIDA ==============
  
  const addTipoComida = (nuevoTipoComida) => {
    axios.post('http://localhost:8000/tipocomida', nuevoTipoComida)
      .then(response => {
        setlTipoComidas([...lTipoComidas, response.data]);
        console.log("Tipo de comida agregado con éxito");
      })
      .catch(error => {
        console.error("Error al agregar el tipo de comida:", error);
      });
  }

  const eliminarTipoComida = (id) => {
    axios.delete("http://localhost:8000/tipocomida/" + id)
      .then(() => {
        setlTipoComidas(lTipoComidas.filter(tipoComida => tipoComida._id !== id));
        console.log("Tipo de comida eliminado con éxito");
      })
      .catch(error => {
        console.error("Error al eliminar el tipo de comida:", error);
      });
  };

  const actualizarTipoComida = (tipoComidaActualizado) => {
    console.log("Tipo de comida a actualizar:", tipoComidaActualizado);
    console.log("ID del tipo de comida a actualizar:", tipoComidaActualizado._id);
    axios.put("http://localhost:8000/tipocomida/" + tipoComidaActualizado._id, tipoComidaActualizado)
      .then(response => {
        setlTipoComidas(lTipoComidas.map(tipoComida => tipoComida._id === tipoComidaActualizado._id ? response.data : tipoComida));
        console.log("Tipo de comida actualizado con éxito");
      })
      .catch(error => {
        console.error("Error al actualizar el tipo de comida:", error);
      });
  };

  // ============== MÉTODOS CRUD PARA MENÚS ==============
  
  const addMenu = (nuevoMenu) => {
    axios.post('http://localhost:8000/menus', nuevoMenu)
      .then(response => {
        setlMenus([...lMenus, response.data]);
        console.log("Menú agregado con éxito");
      })
      .catch(error => {
        console.error("Error al agregar el menú:", error);
      });
  }

  const eliminarMenu = (id) => {
    axios.delete("http://localhost:8000/menus/" + id)
      .then(() => {
        setlMenus(lMenus.filter(menu => menu._id !== id));
        console.log("Menú eliminado con éxito");
      })
      .catch(error => {
        console.error("Error al eliminar el menú:", error);
      });
  };

  const actualizarMenu = (menuActualizado) => {
    console.log("Menú a actualizar:", menuActualizado);
    console.log("ID del menú a actualizar:", menuActualizado._id);
    axios.put("http://localhost:8000/menus/" + menuActualizado._id, menuActualizado)
      .then(response => {
        setlMenus(lMenus.map(menu => menu._id === menuActualizado._id ? response.data : menu));
        console.log("Menú actualizado con éxito");
      })
      .catch(error => {
        console.error("Error al actualizar el menú:", error);
      });
  };
  

  return (
    <div className='App'>
      
      
      <BrowserRouter>
        <Routes>
          <Route path={""} element={<Inicio/>} />
          <Route path={"/restaurantes"} element={<AllRestaurantes restaurantes={lRestaurantes} deleteRestaurante={eliminarRestaurante}/>} />
          <Route path={"/crearRestaurante"} element={<CrearRestauranteForm handlerAgregar={addRestaurante} />} />
          <Route path={"/editar/restaurante/:id"} element={<EditarRestauranteForm handlerEditar={actualizarRestaurante} restaurantes={lRestaurantes}/>} />
          <Route path={"/usuarios"} element={<AllUsuarios usuarios={lUsuarios} deleteUsuario={eliminarUsuario} />} />
          <Route path={"/crearUsuario"} element={<CrearUsuarioForm handlerAgregar={addUsuario} />} />
          <Route path={"/editar/usuario/:id"} element={<EditarUsuarioForm handlerEditar={actualizarUsuario} usuarios={lUsuarios}/>} />
          <Route path={"/tipocomidas"} element={<AllTipoComidas tipoComidas={lTipoComidas} deleteTipoComida={eliminarTipoComida} />} />
          <Route path={"/crearTipoComida"} element={<CrearTipoComidaForm handlerAgregar={addTipoComida} />} />
          <Route path={"/editar/tipocomida/:id"} element={<EditarTipoComidaForm handlerEditar={actualizarTipoComida} tipoComidas={lTipoComidas}/>} />
          <Route path={"/menus"} element={<AllMenus menus={lMenus} eliminarMenu={eliminarMenu} restaurantes={lRestaurantes} tipoComidas={lTipoComidas} />} />
          <Route path={"/crearMenu"} element={<CrearMenuForm handlerAgregar={addMenu} restaurantes={lRestaurantes} tipoComidas={lTipoComidas} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
      

export default App;
