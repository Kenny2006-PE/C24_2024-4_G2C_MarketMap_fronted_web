import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    dni: '',
    numero: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register', formData);
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Apellido</label>
          <input type="text" name="apellido" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Correo</label>
          <input type="email" name="correo" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>DNI</label>
          <input type="text" name="dni" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Número</label>
          <input type="text" name="numero" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
