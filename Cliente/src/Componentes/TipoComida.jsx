import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TipoComida.css";

const TipoComida = (props) => {

    const { tipoComidaID, nombre, paisOrigen, eliminarTipoComida} = props;

    const handlerEliminar = (e) => {
        e.preventDefault();
        eliminarTipoComida(tipoComidaID);
    }
    
    const navigate = useNavigate()
    const handlerEditar = (e) => {
        e.preventDefault();
        navigate("/editar/tipocomida/" + tipoComidaID)
    }

    // Función para generar un icono basado en el tipo de comida
    const getTipoComidaIcon = (nombre) => {
        const iconMap = {
            'italiana': '🍝',
            'mexicana': '🌮',
            'china': '🥢',
            'japonesa': '🍣',
            'francesa': '🥐',
            'india': '🍛',
            'española': '🥘',
            'tailandesa': '🍜',
            'griega': '🫒',
            'argentina': '🥩'
        };
        
        const nombreLower = nombre.toLowerCase();
        for (const [key, icon] of Object.entries(iconMap)) {
            if (nombreLower.includes(key)) {
                return icon;
            }
        }
        return '🍽️'; // Icono por defecto
    }

    // Función para obtener la bandera del país
    const getPaisFlag = (pais) => {
        const flagMap = {
            'italia': '🇮🇹',
            'méxico': '🇲🇽',
            'mexico': '🇲🇽',
            'china': '🇨🇳',
            'japón': '🇯🇵',
            'japon': '🇯🇵',
            'francia': '🇫🇷',
            'india': '🇮🇳',
            'españa': '🇪🇸',
            'tailandia': '🇹🇭',
            'grecia': '🇬🇷',
            'argentina': '🇦🇷',
            'estados unidos': '🇺🇸',
            'brasil': '🇧🇷',
            'perú': '🇵🇪',
            'peru': '🇵🇪'
        };
        
        const paisLower = pais.toLowerCase();
        return flagMap[paisLower] || '🌍';
    }
    
    return (
        <div className="tipocomida-card">
            <div className="tipocomida-header">
                <div className="avatar-container">
                    <div className="tipocomida-avatar">
                        {getTipoComidaIcon(nombre)}
                    </div>
                    <div className="status-badge">
                        <span className="status-dot"></span>
                        Disponible
                    </div>
                </div>
                
                <div className="tipocomida-info">
                    <div className="tipocomida-id">ID: {tipoComidaID}</div>
                    <h2 className="tipocomida-nombre">{nombre}</h2>
                    <div className="tipocomida-pais">
                        <svg className="location-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {getPaisFlag(paisOrigen)} {paisOrigen}
                    </div>
                </div>
            </div>
            
            {/* Contenido principal */}
            <div className="tipocomida-body">
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label">Tipo de Cocina</div>
                        <div className="info-value">{nombre}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">País de Origen</div>
                        <div className="info-value">{paisOrigen}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Estado</div>
                        <div className="info-value status-active">Disponible</div>
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

export default TipoComida;
