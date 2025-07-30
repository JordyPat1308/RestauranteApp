import React from "react";
import { useState } from "react";
import Restaurante from './Restaurante';
import { useNavigate } from "react-router-dom";
import "../styles/AllRestaurantes.css";



const AllRestaurantes = ({restaurantes, deleteRestaurante}) => {
  const [likesTotales, setLikesTotales] = useState(0);
  const [mensajeError, setMensajeError] = useState("");



  const navigate = useNavigate();
  const handlerRegresar = () => {
    navigate("/");
  }

  const handlerCrearRestaurante = () => {
    navigate("/crearRestaurante");
  }


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
        
        <button className="boton-regresar" onClick={handlerRegresar}>Go to home</button>
      </div>
    </div>
  );
}
export default AllRestaurantes;
