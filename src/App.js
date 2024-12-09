import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductoForm from './components/ProductoForm';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publicar-producto" element={<ProductoForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
