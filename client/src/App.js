import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import QuotationList from './components/QuotationList';
import QuotationCreate from './components/QuotationCreate';
import QuotationDetails from './components/QuotationDetails';
import QuotationEdit from './components/QuotationEdit';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import PageNotFound from './components/PageNotFound';

function App() {

  const logoutUser = () => {
    Cookies.remove("sessionInfo")
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/quotations" element={<QuotationList logoutUser={logoutUser} />} />
        <Route path="/quotations/add" element={<QuotationCreate logoutUser={logoutUser} />} />
        <Route path="/quotations/edit/:id" element={< QuotationEdit logoutUser={logoutUser} />} />
        <Route path="/quotations/:id" element={< QuotationDetails logoutUser={logoutUser} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
