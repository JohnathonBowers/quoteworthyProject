import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

// Below, I relied on code from Dennis Ivy's Medium article called "Creating Protected Routes with ReactRouter V6" (https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c)

const ProtectedRoutes = () => {
    
    let isLoggedIn = Cookies.get("sessionInfo")
    
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes