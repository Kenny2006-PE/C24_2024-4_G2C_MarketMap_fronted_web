import React, { useEffect } from "react";
import L from "leaflet";
import "./Map.css";

const Map = ({ productos }) => {
  useEffect(() => {
    const container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }

    const map = L.map("map").setView([-12.046374, -77.042793], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    productos.forEach((producto) => {
      if (producto.latitud && producto.longitud && producto.imagen_url) {
        const icon = L.icon({
          iconUrl: producto.imagen_url, // Usa la URL de la imagen
          iconSize: [50, 50], // Ajusta el tamaño del marcador
          iconAnchor: [25, 25],
          popupAnchor: [0, -20],
        });

        const marker = L.marker([producto.latitud, producto.longitud], { icon }).addTo(map);

        marker.bindPopup(`
            <div style="text-align: center;">
              <img src="${producto.imagen_url}" alt="${producto.nombre}" style="width: 100px; height: auto; margin-bottom: 5px;" />
              <br />
              <strong>${producto.nombre}</strong>
              <br />
              ${producto.descripcion || ""}
              <br />
              <a href="/producto/${producto.id}" class="btn btn-primary btn-sm mt-2">Ver más</a>
            </div>
          `);
          
      }
    });

    return () => {
      map.remove();
    };
  }, [productos]);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default Map;
