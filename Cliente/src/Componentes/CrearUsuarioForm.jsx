import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../styles/CrearUsuarioForm.css";

const CrearUsuarioForm = ({handlerAgregar})=> {
    const[usuario, setUsuario] = useState({
        username: "",
        email: "",
        password: ""
    });

    const onChangeDatos =(e) => {
        const {name, value} = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const Agregar = (e) => {
        e.preventDefault();
        handlerAgregar(usuario);
        setUsuario({
            username: "",
            email: "",
            password: ""
        });
    }

    return (
        <div className="crear-usuario">
            <div className="crear-usuario-container">
                <div className="form-header">
                    <h1 className="form-titulo">👤 Crear Usuario</h1>
                    <p className="form-subtitulo">Agrega un nuevo usuario al sistema</p>
                </div>

                <form className="usuario-form" onSubmit={Agregar}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Nombre de Usuario:</label>
                        <input 
                            className="form-input" 
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            value={usuario.username} 
                            onChange={onChangeDatos}
                            placeholder="Ej: usuario123"
                            minLength="3"
                            maxLength="50"
                            pattern="[a-zA-Z0-9]+"
                            title="Solo letras y números, entre 3 y 50 caracteres"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input 
                            className="form-input" 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value={usuario.email} 
                            onChange={onChangeDatos}
                            placeholder="Ej: usuario@ejemplo.com"
                            maxLength="100"
                        />
                    </div>
         
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Contraseña:</label>
                        <input 
                            className="form-input" 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            value={usuario.password} 
                            onChange={onChangeDatos}
                            placeholder="Mínimo 6 caracteres"
                            minLength="6"
                            maxLength="255"
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button className="boton-enviar" type="submit">
                            ✨ Agregar Usuario
                        </button>
                        <Link className="boton-home" to="/usuarios">
                            🏠 Volver
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CrearUsuarioForm;
