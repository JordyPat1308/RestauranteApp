import React from "react";
import TipoComida from "./TipoComida";
import { Link } from "react-router-dom";
import "../styles/AllTipoComidas.css";

const AllTipoComidas = (props) => {
    const { tipoComidas, deleteTipoComida } = props;

    return (
        <div className="all-tipocomidas-container">
            <div className="tipocomidas-container">
                <div className="tipocomidas-header">
                    <div className="header-content">
                        <h1>
                            <span className="title-icon">🍽️</span>
                            Tipos de Comida
                        </h1>
                        <p className="subtitle">Gestiona todos los tipos de cocina disponibles</p>
                    </div>
                    
                    <div className="header-actions">
                        <Link to="/crearTipoComida" className="btn-add">
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                            Agregar Tipo de Comida
                        </Link>
                        <Link to="/" className="btn-home">
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                            Inicio
                        </Link>
                    </div>
                </div>

                <div className="tipocomidas-stats">
                    <div className="stat-card">
                        <div className="stat-number">{tipoComidas.length}</div>
                        <div className="stat-label">Tipos de Cocina</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{new Set(tipoComidas.map(tc => tc.paisOrigen)).size}</div>
                        <div className="stat-label">Países Representados</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{tipoComidas.length}</div>
                        <div className="stat-label">Disponibles</div>
                    </div>
                </div>

                {tipoComidas.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🍽️</div>
                        <h3>No hay tipos de comida registrados</h3>
                        <p>Comienza agregando el primer tipo de cocina</p>
                        <Link to="/crearTipoComida" className="btn-add-empty">
                            Agregar Primer Tipo de Comida
                        </Link>
                    </div>
                ) : (
                    <div className="tipocomidas-grid">
                        {tipoComidas.map((tipoComida) => (
                            <TipoComida
                                key={tipoComida._id}
                                tipoComidaID={tipoComida._id}
                                nombre={tipoComida.nombre}
                                paisOrigen={tipoComida.paisOrigen}
                                eliminarTipoComida={deleteTipoComida}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllTipoComidas;
