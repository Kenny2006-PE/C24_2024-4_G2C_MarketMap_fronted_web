import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import Footer from "../components/Footer";
const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener productos desde el backend
    fetch("http://localhost:8080/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div>
      
      <Map productos={productos} />
    </div>
  );
};

export default Home;
