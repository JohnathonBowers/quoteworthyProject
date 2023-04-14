import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import QuotationList from './components/QuotationList';
import QuotationCreate from './components/QuotationCreate';
import QuotationDetails from './components/QuotationDetails';
import QuotationEdit from './components/QuotationEdit';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import PageNotFound from './components/PageNotFound';

function App() {
  
  const [sessionInfo, setSessionInfo] = useState({
    userId: "",
    isLoggedIn: false
  })
  
  const loginUser = userId => {
    setSessionInfo({...sessionInfo, 
      userId: userId,
      isLoggedIn: true
    })
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm loginUser={loginUser} />} />
        <Route path="/register" element={<RegistrationForm loginUser={loginUser} />} />
        <Route path="/quotations" element={<QuotationList userId={sessionInfo.userId} isLoggedIn={sessionInfo.isLoggedIn}/>} />
        <Route path="/quotations/add" element={<QuotationCreate />} />
        <Route path="/quotations/edit/:id" element={< QuotationEdit />} />
        <Route path="/quotations/:id" element={< QuotationDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
