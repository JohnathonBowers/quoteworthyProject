import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import QuotationList from './components/QuotationList';
import QuotationCreate from './components/QuotationCreate';
import QuotationDetails from './components/QuotationDetails';
import QuotationEdit from './components/QuotationEdit';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import PageNotFound from './components/PageNotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import LoggedOutRoutes from './components/LoggedOutRoutes';

function App() {
    const [userFirstName, setUserFirstName] = useState('');

    const logoutUser = () => {
        setUserFirstName('');
        Cookies.remove('sessionInfo');
    };

    return (
        <div className="App">
            <Routes>
                <Route element={<LoggedOutRoutes />}>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route
                        path="/login"
                        element={
                            <LoginForm setUserFirstName={setUserFirstName} />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <RegistrationForm
                                setUserFirstName={setUserFirstName}
                            />
                        }
                    />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route
                        path="/quotations/user/:userId"
                        element={
                            <QuotationList
                                logoutUser={logoutUser}
                                setUserFirstName={setUserFirstName}
                                userFirstName={userFirstName}
                            />
                        }
                    />
                    <Route
                        path="/quotations/add/user/:userId"
                        element={
                            <QuotationCreate
                                logoutUser={logoutUser}
                                setUserFirstName={setUserFirstName}
                                userFirstName={userFirstName}
                            />
                        }
                    />
                    <Route
                        path="/quotations/edit/:quotationId/user/:userId"
                        element={
                            <QuotationEdit
                                logoutUser={logoutUser}
                                setUserFirstName={setUserFirstName}
                                userFirstName={userFirstName}
                            />
                        }
                    />
                    <Route
                        path="/quotations/details/:quotationId/user/:userId"
                        element={
                            <QuotationDetails
                                logoutUser={logoutUser}
                                setUserFirstName={setUserFirstName}
                                userFirstName={userFirstName}
                            />
                        }
                    />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
