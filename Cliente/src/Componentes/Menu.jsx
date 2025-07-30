import React from "react";
import "../styles/Menu.css";

const Menu = (props) => {
    const { menuId, restaurante, tipoComida, menuDate, eliminarMenu } = props;

    const handlerEliminar = (e) => {
        e.preventDefault();
        eliminarMenu(menuId);
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
        return '🍽️';
    }

    return (
        <div className="menu-card">
            <div className="menu-header">
                <div className="menu-avatar">
                    <div className="menu-icon">
                        {getTipoComidaIcon(tipoComida?.nombre || 'menu')}
                    </div>
                    <div className="status-badge">
                        <span className="status-dot"></span>
                        Activo
                    </div>
                </div>
                
                <div className="menu-info">
                    <div className="menu-id">Menú ID: {menuId}</div>
                    <h2 className="menu-titulo">{restaurante?.nombre}</h2>
                    <div className="menu-details">
                        <svg className="detail-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Cocina {tipoComida?.nombre}
                    </div>
                </div>
            </div>
            
            <div className="menu-body">
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label">Restaurante</div>
                        <div className="info-value">{restaurante?.nombre}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Tipo de Cocina</div>
                        <div className="info-value">{tipoComida?.nombre}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Fecha del Menú</div>
                        <div className="info-value">{formatDate(menuDate)}</div>
                    </div>
                </div>
                
                <div className="actions-container">
                    <button className="btn btn-delete" onClick={handlerEliminar}>
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Eliminar Menú
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu;
