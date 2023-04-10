import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const QuotationCreate = () => {
    
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
    
    

    return (
        <div className="container mt-4 col-sm-8">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h2><strong>Quoteworthy</strong></h2>
                <Link to="/quotations">View Collection</Link>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <h2 className="my-4">Add a Quotation</h2>
            </div>
        </div>
    )
}

export default QuotationCreate