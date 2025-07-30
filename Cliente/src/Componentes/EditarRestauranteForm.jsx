import React, { useState, useEffect, useNavigate} from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/EditarRestauranteForm.css";

const EditarRestauranteForm = ({ handlerEditar, restaurantes }) => {

  const [restaurante, setRestaurante] = useState({});
  const { id } = useParams();
 

  useEffect(() => {
    console.log("Todos los restaurantes: "+restaurantes);
    // Solo ejecuta si restaurantes está listo y no se ha cargado aún el restaurante
    if (restaurantes && restaurantes.length > 0 && Object.keys(restaurante).length === 0) {
      const restauranteEncontrado = restaurantes.find(rest => rest._id === parseInt(id));
      if (restauranteEncontrado) {
        setRestaurante(restauranteEncontrado);
        console.log("Restaurante encontrado:", restauranteEncontrado); // ✅ Se ejecuta solo una vez
        console.log("ID del restaurante a editar:", id); // ✅ Se ejecuta solo una vez
      } else {
        console.error("Restaurante no encontrado");
      }
    }
  }, [restaurantes, id]); // ✅ Ejecuta solo cuando cambian estos valores

  const onChangeDatos = (e) => {
    const { name, value } = e.target;
    setRestaurante(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const Editar = (e) => {
    e.preventDefault();
    handlerEditar(restaurante);
  };

  return (
    <div className="editar-restaurante">
      <div className="editar-restaurante-container">
        <div className="form-header">
          <h1 className="form-titulo">✏️ Editar Restaurante</h1>
          <p className="form-subtitulo">Actualiza la información del restaurante</p>
        </div>

        <form className="restaurante-form" onSubmit={Editar}>
          <div className="form-group">
            <label className="form-label" htmlFor="nombre">Nombre del Restaurante:</label>
            <input
              className="form-input"
              type="text"
              id="nombre"
              name="nombre"
              required
              value={restaurante.nombre || ""}
              onChange={onChangeDatos}
              placeholder="Ej: Restaurante El Buen Sabor"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="direccion">Dirección:</label>
            <input
              className="form-input"
              type="text"
              id="direccion"
              name="direccion"
              required
              value={restaurante.direccion || ""}
              onChange={onChangeDatos}
              placeholder="Ej: Av. Principal #123, Centro"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tipo">Tipo de Comida:</label>
            <input
              className="form-input"
              type="text"
              id="tipo"
              name="tipo"
              required
              value={restaurante.tipo || ""}
              onChange={onChangeDatos}
              placeholder="Ej: Italiana, Mexicana, Asiática"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="url">URL de la Imagen:</label>
            <input
              className="form-input"
              type="url"
              id="url"
              name="url"
              required
              value={restaurante.url || ""}
              onChange={onChangeDatos}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reputacion">Reputación (1-5 estrellas):</label>
            <input
              className="form-input"
              type="number"
              id="reputacion"
              name="reputacion"
              min="1"
              max="5"
              required
              value={restaurante.reputacion || ""}
              onChange={onChangeDatos}
              placeholder="1"
            />
          </div>

          <div className="form-actions">
            <button className="boton-actualizar" type="submit">
              🔄 Actualizar Restaurante
            </button>
            <Link className="boton-home" to="/">
              🏠 Volver al Inicio
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarRestauranteForm;

