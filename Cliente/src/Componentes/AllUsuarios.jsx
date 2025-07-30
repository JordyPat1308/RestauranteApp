import React from "react";
import Usuario from './Usuario';
import { useNavigate } from "react-router-dom";
import "../styles/AllUsuarios.css";

const AllUsuarios = ({usuarios, deleteUsuario}) => {
  const navigate = useNavigate();
  const handlerRegresar = () => {
    navigate("/");
  }

  const handlerCrearUsuario = () => {
    navigate("/crearUsuario");
  }

  const handlerEliminar = (id) => {
    deleteUsuario(id);
  }

  return (
    <div className="all-usuarios">
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
        
        <button className="boton-regresar" onClick={handlerRegresar}>Go to home</button>
      </div>
    </div>
  );
}

export default AllUsuarios;