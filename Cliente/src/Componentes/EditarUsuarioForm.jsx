import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/EditarUsuarioForm.css";

const EditarUsuarioForm = ({ handlerEditar, usuarios }) => {

  const [usuario, setUsuario] = useState({});
  const { id } = useParams();
 
  useEffect(() => {
    console.log("Todos los usuarios: ", usuarios);
    // Solo ejecuta si usuarios está listo y no se ha cargado aún el usuario
    if (usuarios && usuarios.length > 0 && Object.keys(usuario).length === 0) {
      const usuarioEncontrado = usuarios.find(user => user.id === parseInt(id));
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        console.log("Usuario encontrado:", usuarioEncontrado);
        console.log("ID del usuario a editar:", id);
      } else {
        console.error("Usuario no encontrado");
      }
    }
  }, [usuarios, id, usuario]);

  const onChangeDatos = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const Editar = (e) => {
    e.preventDefault();
    handlerEditar(usuario);
  };

  return (
    <div className="editar-usuario">
      <div className="editar-usuario-container">
        <div className="form-header">
          <h1 className="form-titulo">✏️ Editar Usuario</h1>
          <p className="form-subtitulo">Actualiza la información del usuario</p>
        </div>

        <form className="usuario-form" onSubmit={Editar}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Nombre de Usuario:</label>
            <input
              className="form-input"
              type="text"
              id="username"
              name="username"
              required
              value={usuario.username || ""}
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
              value={usuario.email || ""}
              onChange={onChangeDatos}
              placeholder="Ej: usuario@ejemplo.com"
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Nueva Contraseña (opcional):</label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={usuario.password || ""}
              onChange={onChangeDatos}
              placeholder="Dejar vacío para mantener la actual"
              minLength="6"
              maxLength="255"
            />
            <small className="form-help">Deja este campo vacío si no deseas cambiar la contraseña</small>
          </div>

          <div className="form-actions">
            <button className="boton-actualizar" type="submit">
              🔄 Actualizar Usuario
            </button>
            <Link className="boton-home" to="/usuarios">
              🏠 Volver a Usuarios
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuarioForm;
