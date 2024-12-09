import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
