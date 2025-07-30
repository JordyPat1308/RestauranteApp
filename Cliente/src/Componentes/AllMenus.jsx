import React, { useState } from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import "../styles/AllMenus.css";

const AllMenus = (props) => {
    const { menus, eliminarMenu, restaurantes, tipoComidas } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filtroRestaurante, setFiltroRestaurante] = useState("");

    // Función para obtener información completa del menú
    const getMenuCompleto = (menu) => {
        const restaurante = restaurantes.find(r => r._id === menu.restauranteId);
        const tipoComida = tipoComidas.find(t => t._id === menu.tipoComidaId);
        return { ...menu, restaurante, tipoComida };
    };

    // Filtrar menús
    const menusFiltrados = menus.filter(menu => {
        const menuCompleto = getMenuCompleto(menu);
        const coincideSearch = menuCompleto.restaurante?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              menuCompleto.tipoComida?.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const coincideRestaurante = filtroRestaurante === "" || menu.restauranteId.toString() === filtroRestaurante;
        return coincideSearch && coincideRestaurante;
    });

    // Estadísticas
    const totalMenus = menus.length;
    const restaurantesConMenu = [...new Set(menus.map(m => m.restauranteId))].length;
    const tiposComidaEnUso = [...new Set(menus.map(m => m.tipoComidaId))].length;

    return (
        <div className="all-menus">
            <div className="menus-header">
                <div className="title-section">
                    <h1 className="main-title">
                        <span className="title-icon">🍽️</span>
                        Gestión de Menús
                    </h1>
                    <p className="subtitle">Administra las relaciones entre restaurantes y tipos de comida</p>
                </div>
                
                <Link to="/crearMenu" className="btn btn-primary">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Crear Nuevo Menú
                </Link>
            </div>

            {/* Estadísticas */}
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <div className="stat-number">{totalMenus}</div>
                        <div className="stat-label">Total Menús</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🏪</div>
                    <div className="stat-content">
                        <div className="stat-number">{restaurantesConMenu}</div>
                        <div className="stat-label">Restaurantes Activos</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🍳</div>
                    <div className="stat-content">
                        <div className="stat-number">{tiposComidaEnUso}</div>
                        <div className="stat-label">Tipos de Cocina</div>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="filters-container">
                <div className="search-box">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por restaurante o tipo de comida..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <select 
                    className="filter-select"
                    value={filtroRestaurante}
                    onChange={(e) => setFiltroRestaurante(e.target.value)}
                >
                    <option value="">Todos los restaurantes</option>
                    {restaurantes.map(restaurante => (
                        <option key={restaurante._id} value={restaurante._id}>
                            {restaurante.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lista de menús */}
            <div className="menus-content">
                {menusFiltrados.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🍽️</div>
                        <h3>No hay menús disponibles</h3>
                        <p>Comienza creando tu primer menú para conectar restaurantes con tipos de comida</p>
                        <Link to="/crearMenu" className="btn btn-primary">
                            Crear Primer Menú
                        </Link>
                    </div>
                ) : (
                    <div className="menus-grid">
                        {menusFiltrados.map((menu) => {
                            const menuCompleto = getMenuCompleto(menu);
                            return (
                                <Menu
                                    key={menu._id}
                                    menuId={menu._id}
                                    restaurante={menuCompleto.restaurante}
                                    tipoComida={menuCompleto.tipoComida}
                                    menuDate={menu.menuDate}
                                    eliminarMenu={eliminarMenu}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllMenus;
