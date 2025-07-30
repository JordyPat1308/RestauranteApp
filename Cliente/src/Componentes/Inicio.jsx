import React  from "react";
import { useNavigate } from "react-router-dom";
import "../styles/inicio.css";

const Inicio = () => {
  const navigate = useNavigate();
  
  const handlerLogin = () => {
    navigate("/login");
  }
  
  const handlerRegister = () => {
    navigate("/register");
  }
  
  return (
    <div className="inicio">
      <div className="inicio-container">
        <header className="inicio-header">
          <h1 className="titulo-principal">🍽️ Restaurantes App</h1>
          <p className="subtitulo">La mejor plataforma para gestionar restaurantes</p>
          <p className="descripcion">
            Conecta, gestiona y descubre el mundo gastronómico. 
            Únete a nuestra comunidad de restaurantes y disfruta de una experiencia única.
          </p>
        </header>
        
        <div className="botones-container">
          <button className="boton-principal login" onClick={handlerLogin}>
            <div className="icono">🚪</div>
            <h3>Iniciar Sesión</h3>
            <p>Accede a tu cuenta existente</p>
          </button>
          
          <button className="boton-principal register" onClick={handlerRegister}>
            <div className="icono">�</div>
            <h3>Registrarse</h3>
            <p>Crea una nueva cuenta gratis</p>
          </button>
        </div>
        
        <div className="features-section">
          <h2>¿Por qué elegir Restaurantes App?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">�</div>
              <h4>Gestión de Restaurantes</h4>
              <p>Administra todos tus restaurantes desde un solo lugar</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h4>Control de Usuarios</h4>
              <p>Gestiona usuarios y permisos de manera eficiente</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍕</div>
              <h4>Categorías de Comida</h4>
              <p>Organiza tu oferta gastronómica por categorías</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h4>Gestión de Menús</h4>
              <p>Crea y actualiza menús de forma sencilla</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inicio;