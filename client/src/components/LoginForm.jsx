import React, { useState } from 'react'
import HomeHeader from './HomeHeader'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
    
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    
    const [errors, setErrors] = useState()

    const navigate = useNavigate()

    const handleChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/login", loginData, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate("/quotations")
            })
            .catch(err => {
                console.log(err.response.data.message)
                setErrors(err.response.data.message)
            })
    }

    return (
        <div className="container col-md-6">
            <HomeHeader />
            <div className="mt-4 shadow-sm p-4 mb-5 bg-body-tertiary rounded">
                {
                    errors ?
                    <p className="text-danger mb-4">{errors}</p> :
                    ""
                }
                <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                        <label htmlFor="email" className="form-label mb-2">Email address:</label>
                        <input type="text" name="email" className="form-control mb-2" value={loginData.email} onChange={handleChange} />
                    </div>
                    <div className="row mb-4">
                        <label htmlFor="password" className="form-label mb-2">Password:</label>
                        <input type="password" name="password" className="form-control mb-2" value={loginData.password} onChange={handleChange} />
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                        <input type="submit" className="btn btn-primary" value="Log in" />
                    </div>
                </form>
                <p className="mt-4 mb-0 text-center">Don't have an account? <Link to="/register">Create one.</Link></p>
            </div>
        </div>
    )
}

export default LoginForm