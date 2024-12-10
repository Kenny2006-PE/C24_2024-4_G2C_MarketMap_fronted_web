import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductoForm from "./components/ProductoForm";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publicar-producto" element={<ProductoForm />} />
        <Route path="/producto/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
