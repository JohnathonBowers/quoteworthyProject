import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import HomeHeader from './HomeHeader'

const RegistrationForm = () => {

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    
    const [errors, setErrors] = useState()

    const [duplicateEmailError, setDuplicateEmailError] = useState()

    const navigate = useNavigate()

    const handleChange = e => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        setDuplicateEmailError("")
        axios.post("http://localhost:8000/api/users/register", userData, {withCredentials: true})
            .then(res => {
                Cookies.set("sessionInfo", `${JSON.stringify({userID: res.data.user._id, firstName: res.data.user.firstName})}`, {expires: 1})
                navigate("/quotations")
            })
            .catch(err => {
                if(err.response.data.message === "The email you entered is already associated with an account!") {
                    setDuplicateEmailError(err.response.data.message)
                } else {
                    setErrors(err.response.data.errors)
                }
            })
    }

    return (
        <div className="container col-md-6">
            <HomeHeader />
            <div className="mt-4 shadow-sm p-4 mb-5 bg-body-tertiary rounded">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="form-label mb-2">First name:</label>
                        <input type="text" name="firstName" className="form-control mb-2" value={userData.firstName} onChange={handleChange} />
                        {
                            errors && errors.firstName ?
                            <p className="text-danger mb-2">{errors.firstName.message}</p> :
                            ""
                        }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="form-label mb-2">Last name:</label>
                        <input type="text" name="lastName" className="form-control mb-2" value={userData.lastName} onChange={handleChange} />
                        {
                            errors && errors.lastName ?
                            <p className="text-danger mb-2">{errors.lastName.message}</p> :
                            ""
                        }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label mb-2">Email:</label>
                        <input type="text" name="email" className="form-control mb-2" value={userData.email} onChange={handleChange} />
                        {
                            duplicateEmailError ?
                            <p className="text-danger mb-2">{duplicateEmailError}</p> :
                            ""
                        }
                        {
                            errors && errors.email ?
                            <p className="text-danger mb-2">{errors.email.message}</p> :
                            ""
                        }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label mb-2">Password:</label>
                        <input type="password" name="password" className="form-control mb-2" value={userData.password} onChange={handleChange} />
                        {
                            errors && errors.password ?
                            <p className="text-danger mb-2">{errors.password.message}</p> :
                            ""
                        }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label mb-2">Confirm password:</label>
                        <input type="password" name="confirmPassword" className="form-control mb-2" value={userData.confirmPassword} onChange={handleChange} />
                        {
                            errors && errors.confirmPassword ?
                            <p className="text-danger mb-2">{errors.confirmPassword.message}</p> :
                            ""
                        }
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </div>
                </form>
                <p className="mt-4 mb-0 text-center">Already have an account? <Link to="/login">Log in.</Link></p>
            </div>
        </div>
    )
}

export default RegistrationForm