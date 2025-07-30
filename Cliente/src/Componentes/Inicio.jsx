import React  from "react";
import { useNavigate } from "react-router-dom";
import "../styles/inicio.css";

const Inicio = () => {
  const navigate = useNavigate();
  
  const handlerRestaurantes = () => {
    navigate("/restaurantes");
  }
  
  const handlerUsuarios = () => {
    navigate("/usuarios");
  }
  
  const handlerTiposComida = () => {
    navigate("/tipocomidas");
  }
  
  const handlerMenus = () => {
    navigate("/menus");
  }
  
  return (
    <div className="inicio">
      <div className="inicio-container">
        <header className="inicio-header">
          <h1 className="titulo-principal">🍽️ Restaurantes App</h1>
          <p className="subtitulo">Explora y descubre los mejores restaurantes de tu ciudad</p>
        </header>
        
        <div className="botones-container">
          <button className="boton-principal restaurantes" onClick={handlerRestaurantes}>
            <div className="icono">🏪</div>
            <h3>Ver Restaurantes</h3>
            <p>Explora todos los restaurantes disponibles</p>
          </button>
          
          <button className="boton-principal usuarios" onClick={handlerUsuarios}>
            <div className="icono">👥</div>
            <h3>Ver Usuarios</h3>
            <p>Gestiona la información de usuarios</p>
          </button>
          
          <button className="boton-principal tipos-comida" onClick={handlerTiposComida}>
            <div className="icono">🍕</div>
            <h3>Tipos de Comida</h3>
            <p>Descubre diferentes categorías gastronómicas</p>
          </button>
          
          <button className="boton-principal menus" onClick={handlerMenus}>
            <div className="icono">🍽️</div>
            <h3>Gestión de Menús</h3>
            <p>Conecta restaurantes con tipos de cocina</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Inicio;