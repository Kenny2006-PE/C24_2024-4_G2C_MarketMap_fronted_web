import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductoForm from "./components/ProductoForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import ProductDetails from './components/ProductDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publicar-producto" element={<ProductoForm />} />
        <Route path="/producto/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
