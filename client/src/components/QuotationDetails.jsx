import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const QuotationDetails = (props) => {
    
    const [quotation, setQuotation] = useState({})

    const {id} = useParams()
    
    const { logoutUser } = props

    const userInfo = JSON.parse(Cookies.get("sessionInfo"))

    const navigate = useNavigate()

    const handleDeleteButton = quotationId => {
        axios.delete("http://localhost:8000/api/quotations/" + quotationId, {withCredentials: true})
            .then(navigate("/"))
            .catch(err => console.log(err))
    }

    const handleLogoutItem = e => {
        axios.post("http://localhost:8000/api/users/logout", {}, {withCredentials: true})
            .then(res => {
                logoutUser()
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/quotations/" + id, {withCredentials: true})
            .then(res => setQuotation(res.data))
            .catch(err => console.log(err))
    }, [id])

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
                <h2 className="mt-4 mb-2">Quotation Details</h2>
                <Link className="mb-2" to="/quotations">Back to collection</Link>
            </div>
            <div className="container col-lg-10">
                <h5 className="my-4 shadow-sm p-4 mb-5 bg-body-tertiary rounded">{quotation.quotation}</h5>
                <p className="mt-4 mb-2"><strong>Citation Information:</strong></p>
                {
                    quotation.endPage === quotation.startPage ?
                    <p><span>&#8212;</span> {quotation.authorFirstName} {quotation.authorLastName}, <em>{quotation.bookTitle}</em> ({quotation.publisherLocation}: {quotation.publisherName}, {quotation.yearPublished}), {quotation.startPage}</p> :
                    <p><span>&#8212;</span> {quotation.authorFirstName} {quotation.authorLastName}, <em>{quotation.bookTitle}</em> ({quotation.publisherLocation}: {quotation.publisherName}, {quotation.yearPublished}), {quotation.startPage}-{quotation.endPage}</p>
                }
                <p className="mt-4 mb-2"><strong>Your Comments:</strong></p>
                <p className="mb-4">{quotation.comments}</p>
            </div>
            <div className="mt-4 d-flex flex-row justify-content-center">
                <button className="me-4 btn btn-warning" onClick={e => navigate("/quotations/edit/" + id)}>Edit Quotation</button>
                <button className="btn btn-danger" onClick={e => handleDeleteButton(quotation._id)}>Delete Quotation</button>
            </div>
        </div>
    )
}

export default QuotationDetails