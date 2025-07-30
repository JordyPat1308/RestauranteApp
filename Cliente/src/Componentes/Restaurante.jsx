/// en lugar de traer todo el objeto, solo traigo lo que necesito destructurando para traer el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Restaurante.css";

const Restaurante = (props) => {

    const { restauranteID, nombre, direccion, tipo, url,reputacion, onLike, onDislike, eliminarRestaurante} = props;
    //const [likes, setLikes] = useState(0);
    //const [dislikes, setDislikes] = useState(0);
    const [preferencia, setPreferencia] = useState({
        likes: 0,
        unlikes: 0
    });

    const handlerLike = () => {
        setPreferencia((prevState) => {
            return {
                ...prevState,
                likes: prevState.likes + 1
            }
        });
        onLike();
    }

    const handlerDislike = () => {
        setPreferencia((prevState) => {
            return {
                ...prevState,
                unlikes: prevState.unlikes - 1
            }
        });
        onDislike();
    }
    const handlerEliminar = (e) => {
        e.preventDefault();
        eliminarRestaurante(restauranteID);
    }
    const navigate = useNavigate() // Asumiendo que estás usando React Router para la navegación
    const handlerEditar= (e) => {
        e.preventDefault();
        navigate("/editar/restaurante/"+restauranteID)
    }


    
    return (
        <div className="restaurante-card">
            <div className="restaurante-header">
                <img src={url} alt="Logo del Restaurante" className="restaurante-imagen" />
                <div className="restaurante-info">
                    <h1 className="restaurante-titulo">{restauranteID}.{nombre}</h1>
                    <h3 className="restaurante-direccion">{direccion}</h3>
                    <span className="restaurante-tipo">{tipo}</span>
                    <h4 className="restaurante-reputacion">⭐ Reputación: {reputacion}</h4>
                </div>
            </div>
            
            <div className="card-content">
                <div className="likes-section">
                    <div className="like-group">
                        <span className="contador-likes">{preferencia.likes}</span>
                        <button className="boton-like" onClick={handlerLike}>👍 Like</button>
                    </div>
                    <div className="like-group">
                        <span className="contador-likes">{preferencia.unlikes}</span>
                        <button className="boton-dislike" onClick={handlerDislike}>👎 Dislike</button>
                    </div>
                </div>

                <div className="botones-accion">
                    <button className="boton-eliminar" onClick={handlerEliminar}>
                        🗑️ Eliminar
                    </button>
                    <button className="boton-editar" onClick={handlerEditar}>
                        ✏️ Editar
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Restaurante;