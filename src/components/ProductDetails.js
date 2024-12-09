import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/productos/${id}`);
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error('Producto no encontrado.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Hubo un problema al cargar la información del producto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.latitud && product.longitud) {
      const container = L.DomUtil.get('product-map');
      if (container != null) {
        container._leaflet_id = null;
      }

      const map = L.map('product-map').setView([product.latitud, product.longitud], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Crear icono personalizado con la imagen del producto
      const icon = L.icon({
        iconUrl: product.imagen_url,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -40],
      });

      L.marker([product.latitud, product.longitud], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <img src="${product.imagen_url}" alt="${product.nombre}" style="width: 100px; height: auto;" />
            <strong>${product.nombre}</strong>
          </div>
        `)
        .openPopup();
    }
  }, [product]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-info">Cargando información del producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">No se encontró el producto.</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">{product.nombre}</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h4>Descripción</h4>
          <p>{product.descripcion}</p>
          <h4>Estado</h4>
          <p>{product.estado}</p>
          <h4>Precio</h4>
          <p>${product.precio.toFixed(2)}</p>
          <h4>Ubicación</h4>
          <div id="product-map" style={{ height: '300px', width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
