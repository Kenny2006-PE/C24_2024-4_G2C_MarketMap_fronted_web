import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MarketMap</Link>
        <div className="d-flex">
          <Link className="btn btn-primary" to="/publicar-producto">Publicar Producto</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
