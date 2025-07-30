import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/EditarTipoComidaForm.css";

const EditarTipoComidaForm = (props) => {
    const { handlerEditar, tipoComidas } = props;
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [nombre, setNombre] = useState("");
    const [paisOrigen, setPaisOrigen] = useState("");
    const [errors, setErrors] = useState({});
    const [tipoComidaOriginal, setTipoComidaOriginal] = useState(null);

    useEffect(() => {
        if (tipoComidas && id) {
            const tipoComida = tipoComidas.find(tc => tc._id === parseInt(id));
            if (tipoComida) {
                setNombre(tipoComida.nombre);
                setPaisOrigen(tipoComida.paisOrigen);
                setTipoComidaOriginal(tipoComida);
            }
        }
    }, [tipoComidas, id]);

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
        
        if (validateForm() && tipoComidaOriginal) {
            const tipoComidaActualizado = {
                ...tipoComidaOriginal,
                nombre: nombre.trim(),
                paisOrigen: paisOrigen.trim()
            };
            
            handlerEditar(tipoComidaActualizado);
            navigate("/tipocomidas");
        }
    };

    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    const hasChanges = tipoComidaOriginal && (
        nombre !== tipoComidaOriginal.nombre || 
        paisOrigen !== tipoComidaOriginal.paisOrigen
    );

    if (!tipoComidaOriginal) {
        return (
            <div className="editar-tipocomida-container">
                <div className="loading-state">
                    <div className="loading-icon">🍽️</div>
                    <h3>Cargando tipo de comida...</h3>
                    <p>Por favor espera un momento</p>
                </div>
            </div>
        );
    }

    return (
        <div className="editar-tipocomida-container">
            <div className="form-wrapper">
                <div className="form-header">
                    <h1 className="form-title">
                        <span className="title-icon">✏️</span>
                        Editar Tipo de Comida
                    </h1>
                    <p className="form-subtitle">Modifica la información del tipo de cocina</p>
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

                    <div className="comparison-section">
                        <h3 className="comparison-title">Comparación de Cambios</h3>
                        <div className="comparison-grid">
                            <div className="comparison-card original">
                                <h4>Datos Originales</h4>
                                <div className="comparison-item">
                                    <span className="comparison-label">Nombre:</span>
                                    <span className="comparison-value">{tipoComidaOriginal.nombre}</span>
                                </div>
                                <div className="comparison-item">
                                    <span className="comparison-label">País:</span>
                                    <span className="comparison-value">{tipoComidaOriginal.paisOrigen}</span>
                                </div>
                            </div>
                            
                            <div className="comparison-card updated">
                                <h4>Nuevos Datos</h4>
                                <div className="comparison-item">
                                    <span className="comparison-label">Nombre:</span>
                                    <span className={`comparison-value ${nombre !== tipoComidaOriginal.nombre ? 'changed' : ''}`}>
                                        {nombre || "Nombre del tipo de comida"}
                                    </span>
                                </div>
                                <div className="comparison-item">
                                    <span className="comparison-label">País:</span>
                                    <span className={`comparison-value ${paisOrigen !== tipoComidaOriginal.paisOrigen ? 'changed' : ''}`}>
                                        {paisOrigen || "País de origen"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {!hasChanges && (
                            <div className="no-changes-notice">
                                <span className="notice-icon">ℹ️</span>
                                No hay cambios detectados
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <Link to="/tipocomidas" className="btn-cancel">
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                            Cancelar
                        </Link>
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={!hasChanges}
                        >
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarTipoComidaForm;
