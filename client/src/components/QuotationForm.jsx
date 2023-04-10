import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QuotationForm = (props) => {
    
    const {initialQuotationData, onSubmitProp, errors} = props
    
    const [quotation, setQuotation] = useState(initialQuotationData)

    const navigate = useNavigate()

    const handleChange = e => {
        setQuotation({...quotation, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        onSubmitProp(quotation)
    }

    const handleCancel = e => {
        navigate("/quotations")
    }

    return (
        <div className="container col-sm-10 mt-4">
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="authorFirstName" className="form-label mb-2">Author first name:</label>
                        <input type="text" name="authorFirstName" className="form-control mb-4" value={quotation.authorFirstName} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="authorLastName" className="form-label mb-2">Author last name:</label>
                        <input type="text" name="authorLastName" className="form-control mb-4" value={quotation.authorLastName} onChange={handleChange} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QuotationForm