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
    firstName: "",
    lastName: "",
    email: "",
    isLoggedIn: false
  })
  
  const loginUser = userData => {
    setSessionInfo({...sessionInfo, 
      userId: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      isLoggedIn: true
    })
  }

  const logoutUser = () => {
    setSessionInfo({...sessionInfo,
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      isLoggedIn: false
  })
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm loginUser={loginUser} firstName={sessionInfo.firstName}/>} />
        <Route path="/register" element={<RegistrationForm loginUser={loginUser} />} />
        <Route path="/quotations" element={<QuotationList firstName={sessionInfo.firstName} logoutUser={logoutUser} />} />
        <Route path="/quotations/add" element={<QuotationCreate firstName={sessionInfo.firstName} logoutUser={logoutUser} />} />
        <Route path="/quotations/edit/:id" element={< QuotationEdit firstName={sessionInfo.firstName} logoutUser={logoutUser} />} />
        <Route path="/quotations/:id" element={< QuotationDetails firstName={sessionInfo.firstName} logoutUser={logoutUser} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
