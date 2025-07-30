import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout, title }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-logo">
            🍽️ Restaurantes App
          </Link>
          {title && <span className="navbar-title">{title}</span>}
        </div>
        
        <div className="navbar-right">
          <button className="dashboard-btn" onClick={handleDashboard}>
            <span className="icon">🏠</span>
            Dashboard
          </button>
          
          <div className="user-menu">
            <span className="user-name">👤 {user?.username || 'Usuario'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
