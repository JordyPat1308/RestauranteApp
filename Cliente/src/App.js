import './App.css';
import AllRestaurantes from './Componentes/AllRestaurantes';
import AllUsuarios from './Componentes/AllUsuarios';
import AllTipoComidas from './Componentes/AllTipoComidas';
import AllMenus from './Componentes/AllMenus';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from './Componentes/Inicio';
import Login from './Componentes/Login';
import Register from './Componentes/Register';
import Dashboard from './Componentes/Dashboard';
import ProtectedRoute from './Componentes/ProtectedRoute';
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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar la app
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      loadData(); // Cargar datos solo si está autenticado
    }
  }, []);

  const loadData = () => {
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

    // Cargar menús
    axios.get('http://localhost:8000/menus')
      .then(response => {
        setlMenus(response.data);
      })
      .catch(error => {
        console.error("Error al cargar menús:", error);
      });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    loadData(); // Cargar datos después del login
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setlRestaurantes([]);
    setlUsuarios([]);
    setlTipoComidas([]);
    setlMenus([]);
  };

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
          {/* Rutas públicas */}
          <Route path="/" element={!isAuthenticated ? <Inicio/> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register onRegister={handleLogin} /> : <Navigate to="/dashboard" />} />
          
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/restaurantes" element={
            <ProtectedRoute>
              <AllRestaurantes restaurantes={lRestaurantes} deleteRestaurante={eliminarRestaurante}/>
            </ProtectedRoute>
          } />
          
          <Route path="/crearRestaurante" element={
            <ProtectedRoute>
              <CrearRestauranteForm handlerAgregar={addRestaurante} />
            </ProtectedRoute>
          } />
          
          <Route path="/editar/restaurante/:id" element={
            <ProtectedRoute>
              <EditarRestauranteForm handlerEditar={actualizarRestaurante} restaurantes={lRestaurantes}/>
            </ProtectedRoute>
          } />
          
          <Route path="/usuarios" element={
            <ProtectedRoute>
              <AllUsuarios usuarios={lUsuarios} deleteUsuario={eliminarUsuario} />
            </ProtectedRoute>
          } />
          
          <Route path="/crearUsuario" element={
            <ProtectedRoute>
              <CrearUsuarioForm handlerAgregar={addUsuario} />
            </ProtectedRoute>
          } />
          
          <Route path="/editar/usuario/:id" element={
            <ProtectedRoute>
              <EditarUsuarioForm handlerEditar={actualizarUsuario} usuarios={lUsuarios}/>
            </ProtectedRoute>
          } />
          
          <Route path="/tipocomidas" element={
            <ProtectedRoute>
              <AllTipoComidas tipoComidas={lTipoComidas} deleteTipoComida={eliminarTipoComida} />
            </ProtectedRoute>
          } />
          
          <Route path="/crearTipoComida" element={
            <ProtectedRoute>
              <CrearTipoComidaForm handlerAgregar={addTipoComida} />
            </ProtectedRoute>
          } />
          
          <Route path="/editar/tipocomida/:id" element={
            <ProtectedRoute>
              <EditarTipoComidaForm handlerEditar={actualizarTipoComida} tipoComidas={lTipoComidas}/>
            </ProtectedRoute>
          } />
          
          <Route path="/menus" element={
            <ProtectedRoute>
              <AllMenus menus={lMenus} eliminarMenu={eliminarMenu} restaurantes={lRestaurantes} tipoComidas={lTipoComidas} />
            </ProtectedRoute>
          } />
          
          <Route path="/crearMenu" element={
            <ProtectedRoute>
              <CrearMenuForm handlerAgregar={addMenu} restaurantes={lRestaurantes} tipoComidas={lTipoComidas} />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
      

export default App;
