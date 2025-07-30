import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/CrearTipoComidaForm.css";

const CrearTipoComidaForm = (props) => {
    const { handlerAgregar } = props;
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState("");
    const [paisOrigen, setPaisOrigen] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!nombre.trim()) {
            newErrors.nombre = "El nombre del tipo de comida es obligatorio";
        } else if (nombre.trim().length < 2) {
            newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
        }
        
        if (!paisOrigen.trim()) {
            newErrors.paisOrigen = "El país de origen es obligatorio";
        } else if (paisOrigen.trim().length < 2) {
            newErrors.paisOrigen = "El país debe tener al menos 2 caracteres";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const nuevoTipoComida = {
                nombre: nombre.trim(),
                paisOrigen: paisOrigen.trim()
            };
            
            handlerAgregar(nuevoTipoComida);
            
            // Limpiar formulario
            setNombre("");
            setPaisOrigen("");
            setErrors({});
            
            // Redirigir a la lista
            navigate("/tipocomidas");
        }
    };

    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    return (
        <div className="crear-tipocomida-container">
            <div className="form-wrapper">
                <div className="form-header">
                    <h1 className="form-title">
                        <span className="title-icon">🍽️</span>
                        Nuevo Tipo de Comida
                    </h1>
                    <p className="form-subtitle">Agrega un nuevo tipo de cocina al sistema</p>
                </div>

                <form className="tipocomida-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">
                                <svg className="label-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                Nombre del Tipo de Comida *
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.nombre ? 'error' : ''}`}
                                value={nombre}
                                onChange={handleInputChange(setNombre, 'nombre')}
                                placeholder="Ej: Italiana, Mexicana, China..."
                                maxLength="100"
                            />
                            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <svg className="label-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                País de Origen *
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.paisOrigen ? 'error' : ''}`}
                                value={paisOrigen}
                                onChange={handleInputChange(setPaisOrigen, 'paisOrigen')}
                                placeholder="Ej: Italia, México, China..."
                                maxLength="100"
                            />
                            {errors.paisOrigen && <span className="error-message">{errors.paisOrigen}</span>}
                        </div>
                    </div>

                    <div className="preview-section">
                        <h3 className="preview-title">Vista Previa</h3>
                        <div className="preview-card">
                            <div className="preview-icon">🍽️</div>
                            <div className="preview-content">
                                <div className="preview-name">{nombre || "Nombre del tipo de comida"}</div>
                                <div className="preview-country">📍 {paisOrigen || "País de origen"}</div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/tipocomidas" className="btn-cancel">
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                            Cancelar
                        </Link>
                        <button type="submit" className="btn-submit">
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Crear Tipo de Comida
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearTipoComidaForm;
