import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductoForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Nuevo'); // Default: Nuevo
  const [precio, setPrecio] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [vendedorId, setVendedorId] = useState(null); // Debe ser dinámico basado en el usuario logueado

  // Obtener la ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude);
          setLongitud(position.coords.longitude);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          alert('No se pudo obtener la ubicación. Activa los permisos de geolocalización.');
        }
      );
    } else {
      alert('La API de geolocalización no es soportada por este navegador.');
    }
  }, []);

  // Subir la imagen a Cloudinary
  const subirImagen = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error('No se seleccionó un archivo.');
      alert('Por favor selecciona un archivo para subir.');
      return;
    }
  
    // Verificar las variables de entorno
    console.log('Cloudinary Config:', {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    });
  
    if (!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || !process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET) {
      alert('Faltan las variables de configuración de Cloudinary.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      console.log('Respuesta de Cloudinary:', response.data);
      setImagenUrl(response.data.secure_url); // Guardar la URL de la imagen
    } catch (error) {
      console.error('Error al subir la imagen:', error.response?.data || error);
      alert('Error al subir la imagen. Revisa tu configuración y vuelve a intentarlo.');
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Formulario enviado con los siguientes datos:");
    console.log({
      nombre,
      descripcion,
      estado,
      precio,
      imagenUrl,
      latitud,
      longitud,
      vendedorId: vendedorId || 1,
    });
  
    // Validaciones
    if (!latitud || !longitud) {
      alert("Es necesario obtener la ubicación antes de publicar el producto.");
      return;
    }
    if (!imagenUrl) {
      alert("Es necesario subir una imagen antes de publicar el producto.");
      return;
    }
  
    const producto = {
      nombre,
      descripcion,
      estado,
      precio: parseFloat(precio),
      imagen_url: imagenUrl,
      latitud,
      longitud,
      vendedor_id: vendedorId || 1, // Temporalmente usa 1
    };
  
    try {
      const response = await axios.post("http://localhost:8080/productos", producto, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Producto publicado exitosamente.");
    } catch (error) {
      console.error("Error al crear el producto:", error.response?.data || error);
      console.log("Datos del error:", {
        status: error.response?.status,
        headers: error.response?.headers,
        data: error.response?.data,
      });
      alert("Error al crear el producto. Revisa los datos e inténtalo nuevamente.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Publicar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            className="form-select"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="Nuevo">Nuevo</option>
            <option value="Bueno">Bueno</option>
            <option value="Decente">Decente</option>
            <option value="Mal">Mal</option>
            <option value="Dañado">Dañado</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Subir Imagen</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            onChange={subirImagen}
            required
          />
          {imagenUrl && (
            <div className="mt-3">
              <img src={imagenUrl} alt="Producto" style={{ width: '200px' }} />
            </div>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary">Publicar Producto</button>
      </form>
    </div>
  );
};

export default ProductoForm;
