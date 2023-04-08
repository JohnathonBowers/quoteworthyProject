import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import QuotationList from './components/QuotationList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/quotations"/>} />
        <Route path="/quotations" element={<QuotationList />} />
      </Routes>
    </div>
  );
}

export default App;
