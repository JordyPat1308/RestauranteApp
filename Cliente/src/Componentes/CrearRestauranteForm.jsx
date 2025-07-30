import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../styles/CrearRestauranteForm.css";


const CrearRestauranteForm = ({handlerAgregar})=> {
    //const {nombre, direccion, tipo, url, reputacion} = props;
    const[restaurantes, setRestaurantes] = useState({
        nombre: "",
        direccion: "",
        tipo: "",
        url: "",
        reputacion: 0
    });
    const onChangeDatos =(e) => {
        const {name, value} = e.target;
        setRestaurantes(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const Agregar = (e) => {
        e.preventDefault();
        handlerAgregar(restaurantes);
        setRestaurantes({
            nombre: "",
            direccion: "",
            tipo: "",
            url: "",
            reputacion: 0
        });
    }


    return (
        <div className="crear-restaurante">
            <div className="crear-restaurante-container">
                <div className="form-header">
                    <h1 className="form-titulo">🍽️ Crear Restaurante</h1>
                    <p className="form-subtitulo">Agrega un nuevo restaurante a nuestra colección</p>
                </div>

                <form className="restaurante-form" onSubmit={Agregar}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nombre">Nombre del Restaurante:</label>
                        <input 
                            className="form-input" 
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            required 
                            value={restaurantes.nombre} 
                            onChange={onChangeDatos}
                            placeholder="Ej: Restaurante El Buen Sabor"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="direccion">Dirección:</label>
                        <input 
                            className="form-input" 
                            type="text" 
                            id="direccion" 
                            name="direccion" 
                            required 
                            value={restaurantes.direccion} 
                            onChange={onChangeDatos}
                            placeholder="Ej: Av. Principal #123, Centro"
                        />
                    </div>
         
                    <div className="form-group">
                        <label className="form-label" htmlFor="tipo">Tipo de Comida:</label>
                        <input 
                            className="form-input" 
                            type="text" 
                            id="tipo" 
                            name="tipo" 
                            required 
                            value={restaurantes.tipo} 
                            onChange={onChangeDatos}
                            placeholder="Ej: Italiana, Mexicana, Asiática"
                        />
                    </div>
                
                    <div className="form-group">
                        <label className="form-label" htmlFor="url">URL de la Imagen:</label>
                        <input 
                            className="form-input" 
                            type="url" 
                            id="url" 
                            name="url" 
                            required 
                            value={restaurantes.url} 
                            onChange={onChangeDatos}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="reputacion">Reputación (1-5 estrellas):</label>
                        <input 
                            className="form-input" 
                            type="number" 
                            id="reputacion" 
                            name="reputacion" 
                            min="1" 
                            max="5" 
                            required 
                            value={restaurantes.reputacion} 
                            onChange={onChangeDatos}
                            placeholder="1"
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button className="boton-enviar" type="submit">
                            ✨ Agregar Restaurante
                        </button>
                        <Link className="boton-home" to="/restaurantes">
                            🏠 Volver
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default CrearRestauranteForm;
