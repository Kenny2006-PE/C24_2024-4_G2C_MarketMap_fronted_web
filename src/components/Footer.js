import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MarketMap. Todos los derechos reservados.</p>
        <p>Creado con ❤️ por el equipo de desarrollo.</p>
      </div>
    </footer>
  );
};

export default Footer;
