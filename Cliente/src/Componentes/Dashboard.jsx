import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

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
    <div className="dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="titulo-principal">🍽️ Restaurantes App</h1>
              <p className="subtitulo">Panel de Administración</p>
            </div>
            <div className="user-section">
              <div className="user-info">
                <span className="welcome-text">Bienvenido, {user?.username || 'Usuario'}!</span>
                <span className="user-email">{user?.email}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">🏪</div>
              <div className="stat-info">
                <h3>Restaurantes</h3>
                <p>Gestiona tu red de restaurantes</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Usuarios</h3>
                <p>Administra usuarios del sistema</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🍕</div>
              <div className="stat-info">
                <h3>Tipos de Comida</h3>
                <p>Categorías gastronómicas</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🍽️</div>
              <div className="stat-info">
                <h3>Menús</h3>
                <p>Gestión de menús</p>
              </div>
            </div>
          </div>

          <div className="actions-section">
            <h2>¿Qué deseas hacer hoy?</h2>
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
      </div>
    </div>
  );
}

export default Dashboard;
