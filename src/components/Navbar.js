import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Verificar si el usuario está autenticado

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    navigate("/login"); // Redirigir al inicio de sesión
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          MarketMap
        </Link>
        <nav>
          <Link to="/publicar-producto" className="navbar-link">
            Publicar Producto
          </Link>
          {token ? (
            // Botón "Cerrar Sesión" si el usuario está autenticado
            <button onClick={handleLogout} className="navbar-link btn btn-danger">
              Cerrar Sesión
            </button>
          ) : (
            // Botón "Iniciar Sesión" si el usuario no está autenticado
            <Link to="/login" className="navbar-link btn btn-primary">
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
