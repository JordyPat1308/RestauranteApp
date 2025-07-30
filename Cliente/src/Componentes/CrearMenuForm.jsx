import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CrearMenuForm.css";

const CrearMenuForm = (props) => {
    const { handlerAgregar, restaurantes, tipoComidas } = props;
    const navigate = useNavigate();
    
    const [restauranteId, setRestauranteId] = useState("");
    const [tipoComidaId, setTipoComidaId] = useState("");
    const [menuDate, setMenuDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!restauranteId) {
            newErrors.restauranteId = "Debe seleccionar un restaurante";
        }

        if (!tipoComidaId) {
            newErrors.tipoComidaId = "Debe seleccionar un tipo de comida";
        }

        if (!menuDate) {
            newErrors.menuDate = "La fecha del menú es requerida";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const nuevoMenu = {
            restauranteId: parseInt(restauranteId),
            tipoComidaId: parseInt(tipoComidaId),
            menuDate: menuDate
        };

        handlerAgregar(nuevoMenu);
        
        setTimeout(() => {
            setIsSubmitting(false);
            setShowModal(true);
        }, 1000);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate("/menus");
    };

    const getRestauranteSeleccionado = () => {
        return restaurantes.find(r => r._id.toString() === restauranteId);
    };

    const getTipoComidaSeleccionado = () => {
        return tipoComidas.find(t => t._id.toString() === tipoComidaId);
    };

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
        
        const nombreLower = nombre?.toLowerCase() || '';
        for (const [key, icon] of Object.entries(iconMap)) {
            if (nombreLower.includes(key)) {
                return icon;
            }
        }
        return '🍽️';
    };

    return (
        <div className="crear-menu-container">
            <div className="form-header">
                <button 
                    className="btn-back" 
                    onClick={() => navigate("/menus")}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>
                    </svg>
                </button>
                <div className="header-content">
                    <h1 className="form-title">
                        <span className="title-icon">🍽️</span>
                        Crear Nuevo Menú
                    </h1>
                    <p className="form-subtitle">Conecta un restaurante con un tipo de comida</p>
                </div>
            </div>

            <div className="form-content">
                <form onSubmit={handlerSubmit} className="menu-form">
                    <div className="form-section">
                        <h3 className="section-title">Información del Menú</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="restauranteId">Restaurante *</label>
                                <select
                                    id="restauranteId"
                                    value={restauranteId}
                                    onChange={(e) => setRestauranteId(e.target.value)}
                                    className={errors.restauranteId ? "error" : ""}
                                >
                                    <option value="">Seleccionar restaurante...</option>
                                    {restaurantes.map(restaurante => (
                                        <option key={restaurante._id} value={restaurante._id}>
                                            {restaurante.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.restauranteId && <span className="error-message">{errors.restauranteId}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="tipoComidaId">Tipo de Comida *</label>
                                <select
                                    id="tipoComidaId"
                                    value={tipoComidaId}
                                    onChange={(e) => setTipoComidaId(e.target.value)}
                                    className={errors.tipoComidaId ? "error" : ""}
                                >
                                    <option value="">Seleccionar tipo de comida...</option>
                                    {tipoComidas.map(tipo => (
                                        <option key={tipo._id} value={tipo._id}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.tipoComidaId && <span className="error-message">{errors.tipoComidaId}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="menuDate">Fecha del Menú *</label>
                            <input
                                type="date"
                                id="menuDate"
                                value={menuDate}
                                onChange={(e) => setMenuDate(e.target.value)}
                                className={errors.menuDate ? "error" : ""}
                            />
                            {errors.menuDate && <span className="error-message">{errors.menuDate}</span>}
                        </div>
                    </div>

                    {/* Preview */}
                    {restauranteId && tipoComidaId && (
                        <div className="preview-section">
                            <div className="section-header">
                                <h3 className="section-title">Vista Previa</h3>
                                <button
                                    type="button"
                                    className="toggle-preview"
                                    onClick={() => setShowPreview(!showPreview)}
                                >
                                    {showPreview ? "Ocultar" : "Mostrar"} Vista Previa
                                </button>
                            </div>
                            
                            {showPreview && (
                                <div className="preview-card">
                                    <div className="preview-icon">
                                        {getTipoComidaIcon(getTipoComidaSeleccionado()?.nombre)}
                                    </div>
                                    <div className="preview-content">
                                        <h4>{getRestauranteSeleccionado()?.nombre}</h4>
                                        <p>Cocina {getTipoComidaSeleccionado()?.nombre}</p>
                                        <small>Fecha: {new Date(menuDate).toLocaleDateString('es-ES')}</small>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => navigate("/menus")}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Creando...
                                </>
                            ) : (
                                <>
                                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                                    </svg>
                                    Crear Menú
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal de confirmación */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="success-icon">✅</div>
                            <h3>¡Menú Creado Exitosamente!</h3>
                        </div>
                        <div className="modal-body">
                            <p>El menú ha sido creado correctamente y ya está disponible en el sistema.</p>
                            <div className="created-menu-info">
                                <strong>Restaurante:</strong> {getRestauranteSeleccionado()?.nombre}<br/>
                                <strong>Tipo de Comida:</strong> {getTipoComidaSeleccionado()?.nombre}<br/>
                                <strong>Fecha:</strong> {new Date(menuDate).toLocaleDateString('es-ES')}
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-primary" onClick={closeModal}>
                                Ver Menús
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearMenuForm;
