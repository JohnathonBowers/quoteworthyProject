import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const LoggedOutRoutes = () => {
    
    let isLoggedIn = Cookies.get("sessionInfo")

    return (
        isLoggedIn ? <Navigate to={(-1)} /> : <Outlet />
    )
}

export default LoggedOutRoutes