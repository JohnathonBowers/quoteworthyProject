import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

const QuotationDetails = () => {
    
    const [quotation, setQuotation] = useState({})

    const {id} = useParams()
    
    const navigate = useNavigate()

    const handleDeleteButton = quotationId => {
        axios.delete("http://localhost:8000/api/quotations/" + quotationId)
            .then(navigate("/"))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/quotations/" + id)
            .then(res => setQuotation(res.data))
            .catch(err => console.log(err))
    })

    return (
        <div className="container mt-4 col-sm-8">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h2><strong>Quoteworthy</strong></h2>
                <Link to="/quotations">View Collection</Link>
            </div>
            <div className="container col-sm-10">
                <div className="d-flex flex-row justify-content-center">
                    <h2 className="my-4">Quotation Details</h2>
                </div>
                <h5 className="my-4">{quotation.quotation}</h5>
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
                <button className="ms-4 btn btn-danger" onClick={e => handleDeleteButton(quotation._id)}>Delete Quotation</button>
            </div>
        </div>
    )
}

export default QuotationDetails