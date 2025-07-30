import React from "react";
import Usuario from './Usuario';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import "../styles/AllUsuarios.css";

const AllUsuarios = ({usuarios, deleteUsuario}) => {
  const navigate = useNavigate();
  
  // Obtener información del usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handlerCrearUsuario = () => {
    navigate("/crearUsuario");
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handlerEliminar = (id) => {
    deleteUsuario(id);
  }

  return (
    <div className="all-usuarios">
      <Navbar user={user} onLogout={handleLogout} title="Gestión de Usuarios" />
      <div className="all-usuarios-container">
        <div className="header-section">
          <button className="boton-crear-usuario" onClick={handlerCrearUsuario}>
            <span className="icono-crear">👤➕</span>
            Crear Usuario
          </button>
          <h2 className="titulo-usuarios">Gestión de Usuarios</h2>
        </div>
        
        <div className="usuarios-grid">
          {usuarios.map((usuario) => (
            <Usuario
              key={usuario.id}
              usuarioID={usuario.id}
              username={usuario.username}
              email={usuario.email}
              eliminarUsuario={handlerEliminar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllUsuarios;