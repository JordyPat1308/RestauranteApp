/// en lugar de traer todo el objeto, solo traigo lo que necesito destructurando para traer el hook useState
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Usuario.css";

const Usuario = (props) => {

    const { usuarioID, username, email, eliminarUsuario} = props;

    const handlerEliminar = (e) => {
        e.preventDefault();
        eliminarUsuario(usuarioID);
    }
    
    const navigate = useNavigate() // Asumiendo que estás usando React Router para la navegación
    const handlerEditar= (e) => {
        e.preventDefault();
        navigate("/editar/usuario/"+usuarioID)
    }

    // Función para generar un avatar basado en las iniciales del username
    const getAvatar = (username) => {
        const initials = username.substring(0, 2).toUpperCase();
        return `https://ui-avatars.com/api/?name=${initials}&background=667eea&color=fff&size=100&bold=true`;
    }
    
    return (
        <div className="usuario-card">
            {/* Header con avatar y información básica */}
            <div className="usuario-header">
                <div className="avatar-container">
                    <img src={getAvatar(username)} alt="Avatar del Usuario" className="usuario-avatar" />
                    <div className="status-badge">
                        <span className="status-dot"></span>
                        Activo
                    </div>
                </div>
                
                <div className="usuario-info">
                    <div className="usuario-id">ID: {usuarioID}</div>
                    <h2 className="usuario-nombre">{username}</h2>
                    <div className="usuario-email">
                        <svg className="email-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        {email}
                    </div>
                </div>
            </div>
            
            {/* Contenido principal */}
            <div className="usuario-body">
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label">Usuario</div>
                        <div className="info-value">{username}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Email</div>
                        <div className="info-value">{email}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Estado</div>
                        <div className="info-value status-active">Activo</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">ID</div>
                        <div className="info-value">#{usuarioID}</div>
                    </div>
                </div>
                
                {/* Botones de acción */}
                <div className="actions-container">
                    <button className="btn btn-edit" onClick={handlerEditar}>
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Editar
                    </button>
                    <button className="btn btn-delete" onClick={handlerEliminar}>
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Usuario;