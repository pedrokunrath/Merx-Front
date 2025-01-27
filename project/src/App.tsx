import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MarketplaceSelector from './pages/MarketplaceSelector';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketplaceSelector />} />
      <Route path="/product-details" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;