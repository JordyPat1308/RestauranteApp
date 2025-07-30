import React from "react";
import { useState } from "react";
import Restaurante from './Restaurante';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import "../styles/AllRestaurantes.css";



const AllRestaurantes = ({restaurantes, deleteRestaurante}) => {
  const [likesTotales, setLikesTotales] = useState(0);
  const [mensajeError, setMensajeError] = useState("");
  
  const navigate = useNavigate();
  
  // Obtener información del usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handlerCrearRestaurante = () => {
    navigate("/crearRestaurante");
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };


  const actualizarLikesTotales = () => {
    setLikesTotales((prevState) => {
      if (prevState >= 0) {
        handlerError("");
        
      }
      return prevState + 1;
    });
  };

  const actualizarDislikesTotales = () => {
    setLikesTotales((prevState) => {
      if (prevState <= 0) {
        handlerError("No se pueden tener dislikes si no hay likes");
        return prevState;
      }
      return prevState - 1;
    });
  };

  const handlerError = (mensaje) => {
    setMensajeError(mensaje);
  };
  const handlerEliminar = (id) => {
    deleteRestaurante(id);
  }


  

  return (
    <div className="all-restaurantes">
      <Navbar user={user} onLogout={handleLogout} title="Gestión de Restaurantes" />
      <div className="all-restaurantes-container">
        <div className="header-section">
          <button className="boton-crear-restaurante" onClick={handlerCrearRestaurante}>
            <span className="icono-crear">➕</span>
            Crear Restaurante
          </button>
          <h2 className="likes-totales">Cantidad total de likes: {likesTotales}</h2>
        </div>
        
        <h4 className="mensaje-error">{mensajeError}</h4>
        
        <div className="restaurantes-grid">
          {restaurantes.map((rest) => (
            <Restaurante
              key={rest._id}
              restauranteID={rest._id}
              nombre={rest.nombre}
              direccion={rest.direccion}
              tipo={rest.tipo}
              url={rest.url}
              reputacion={rest.reputacion}
              onLike={actualizarLikesTotales}
              onDislike={actualizarDislikesTotales}
              eliminarRestaurante={handlerEliminar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default AllRestaurantes;
