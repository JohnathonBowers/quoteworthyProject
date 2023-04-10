import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import QuotationList from './components/QuotationList';
import QuotationCreate from './components/QuotationCreate';
import QuotationDetails from './components/QuotationDetails';
import QuotationEdit from './components/QuotationEdit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/quotations"/>} />
        <Route path="/quotations" element={<QuotationList />} />
        <Route path="/quotations/add" element={<QuotationCreate />} />
        <Route path="/quotations/edit/:id" element={< QuotationEdit />} />
        <Route path="/quotations/:id" element={< QuotationDetails />} />
      </Routes>
    </div>
  );
}

export default App;
