import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import QuotationForm from './QuotationForm'

const QuotationCreate = (props) => {
    
    const initialQuotationData = {
        authorFirstName: "",
        authorLastName: "",
        bookTitle: "",
        publisherName: "",
        publisherLocation: "",
        yearPublished: "",
        startPage: "",
        endPage: "",
        quotation: "",
        comments: ""
    }

    const [errors, setErrors] = useState()
    
    const { logoutUser } = props

    const userInfo = JSON.parse(Cookies.get("sessionInfo"))

    const navigate = useNavigate()

    const createQuotation = quotationParam => {
        axios.post("http://localhost:8000/api/quotations", quotationParam, {withCredentials: true})
            .then(res => {
                navigate(`/quotations/${res.data._id}`)
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }

    const handleLogoutItem = e => {
        axios.post("http://localhost:8000/api/users/logout", {}, {withCredentials: true})
            .then(res => {
                logoutUser()
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-4 col-lg-8">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h2><strong>Quoteworthy</strong></h2>
                <div className="dropdown">
                    <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Welcome, {userInfo.firstName}</button>
                    <ul className="dropdown-menu">
                        <li><Link to="#" className="dropdown-item" onClick={handleLogoutItem}>Log out</Link></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center">
                <h2 className="mt-4 mb-2">Create a Quotation</h2>
                <Link className="mb-2" to="/quotations">Back to collection</Link>
            </div>
            <QuotationForm initialQuotationData={initialQuotationData} onSubmitProp={createQuotation} errors={errors} />
        </div>
    )
}

export default QuotationCreate