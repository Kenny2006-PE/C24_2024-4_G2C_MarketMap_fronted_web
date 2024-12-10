import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import "./ProductoForm.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('El ID no está presente en la URL.');
      alert('No se encontró el ID del producto.');
      return;
    }

    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`http://localhost:8080/productos/${id}`, { headers });

        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error('Producto no encontrado. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching product details:', error.message);
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
      if (container) container._leaflet_id = null;

      const map = L.map('product-map').setView([product.latitud, product.longitud], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const marker = L.marker([product.latitud, product.longitud]).addTo(map);
      marker.bindPopup(`<b>${product.nombre}</b><br>${product.descripcion}`).openPopup();
    }
  }, [product]);

  if (loading) return <div>Cargando información del producto...</div>;
  if (!product) return <div>Producto no encontrado.</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">{product.nombre}</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <img src={product.imagen_url} alt={product.nombre} className="img-fluid rounded shadow" />
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
