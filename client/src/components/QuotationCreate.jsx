import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import QuotationForm from './QuotationForm'

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

    const [errors, setErrors] = useState([])
    
    const navigate = useNavigate()

    const createQuotation = quotationParam => {
        axios.post("http://localhost:8000/api/quotations", quotationParam)
            .then(res => {
                navigate(`/quotations/${res.data._id}`)
            })
            .catch(err => {
                const errorResponse = err.response.data.errors
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray)
            })
    }

    return (
        <div className="container mt-4 col-sm-8">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h2><strong>Quoteworthy</strong></h2>
                <Link to="/quotations">View Collection</Link>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <h2 className="my-4">Add a Quotation</h2>
            </div>
            <QuotationForm initialQuotationData={initialQuotationData} onSubmitProp={createQuotation} errors={errors} />
        </div>
    )
}

export default QuotationCreate