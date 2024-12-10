import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Verificar si el usuario está autenticado
  const [query, setQuery] = useState(""); // Estado para la búsqueda
  const [results, setResults] = useState([]); // Estado para los resultados de la búsqueda
  const [showResults, setShowResults] = useState(false); // Mostrar u ocultar resultados

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    navigate("/login"); // Redirigir al inicio de sesión
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/productos/buscar?query=${query}`
      );
      setResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  const handleResultClick = (id) => {
    setShowResults(false); // Ocultar resultados al seleccionar
    navigate(`/producto/${id}`); // Navegar al detalle del producto
  };

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">MarketMap</Link>
      </div>
      <nav className="navbar-links">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
          {showResults && results.length > 0 && (
            <ul className="search-results">
              {results.map((producto) => (
                <li
                  key={producto.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(producto.id)}
                >
                  {producto.nombre}
                </li>
              ))}
            </ul>
          )}
          {showResults && results.length === 0 && (
            <div className="no-results">No se encontraron productos.</div>
          )}
        </form>
        <Link to="/publicar-producto" className="navbar-link">
          Publicar Producto
        </Link>
        {token ? (
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login" className="btn-login">
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
