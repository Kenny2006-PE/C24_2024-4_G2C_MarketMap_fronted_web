import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductoForm.css"

const ProductoForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Nuevo");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude);
          setLongitud(position.coords.longitude);
        },
        () => {
          alert("No se pudo obtener la ubicación.");
        }
      );
    }
  }, []);

  const subirImagen = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Selecciona un archivo.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setImagenUrl(response.data.secure_url);
    } catch (error) {
      alert("Error al subir la imagen.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!latitud || !longitud || !imagenUrl) {
      alert("Faltan datos requeridos.");
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
    };
  
    try {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
      if (!token) {
        alert("Usuario no autenticado.");
        return;
      }
  
      const headers = {
        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado de la solicitud
      };
  
      await axios.post("http://localhost:8080/productos", producto, { headers });
      alert("Producto publicado.");
    } catch (error) {
      console.error("Error al publicar el producto:", error);
      alert("Error al publicar el producto.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Publicar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
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
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            Estado
          </label>
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
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
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
          <label htmlFor="imagen" className="form-label">
            Subir Imagen
          </label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            onChange={subirImagen}
            required
          />
          {imagenUrl && (
            <img
              src={imagenUrl}
              alt="Vista previa"
              className="img-fluid mt-3 rounded"
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Publicar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductoForm;
