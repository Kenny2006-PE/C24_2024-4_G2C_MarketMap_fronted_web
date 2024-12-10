import React, { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";
import "./Map.css";

const Map = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const container = L.DomUtil.get("map");
    if (container) container._leaflet_id = null;

    const map = L.map("map").setView([-12.046374, -77.042793], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    productos.forEach((producto) => {
      if (producto.id && producto.latitud && producto.longitud && producto.imagen_url) {
        const icon = L.icon({
          iconUrl: producto.imagen_url,
          iconSize: [50, 50],
          iconAnchor: [25, 25],
          popupAnchor: [0, -20],
        });

        const marker = L.marker([producto.latitud, producto.longitud], { icon }).addTo(map);

        marker.bindPopup(`
          <div style="text-align: center;">
            <img src="${producto.imagen_url}" alt="${producto.nombre}" style="width: 100px; height: auto;" />
            <strong>${producto.nombre}</strong>
            <br />
            ${producto.descripcion || ""}
            <br />
            <a href="/producto/${producto.id}" class="btn btn-primary btn-sm mt-2">Ver más</a>
          </div>
        `);
      } else {
        console.warn("Producto con datos incompletos:", producto);
      }
    });

    return () => map.remove();
  }, [productos]);

  return <div id="map"></div>;
};

export default Map;
