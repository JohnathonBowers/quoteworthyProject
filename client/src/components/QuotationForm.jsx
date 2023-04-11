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
        console.log("Quotation submitted")
        onSubmitProp(quotation)
    }

    const handleCancel = e => {
        navigate("/quotations")
    }

    return (
        <div className="container col-sm-10 mt-4">
            <div className="mb-4">
            {
                errors.map((error, index) => <p key={index} className="text-danger">{error}</p>)
            }
            </div>
            <p className="text-primary my-4">* Indicates a required field</p>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="authorFirstName" className="form-label mb-2">Author First Name:*</label>
                        <input type="text" name="authorFirstName" className="form-control mb-4" value={quotation.authorFirstName} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="authorLastName" className="form-label mb-2">Author Last Name:*</label>
                        <input type="text" name="authorLastName" className="form-control mb-4" value={quotation.authorLastName} onChange={handleChange} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-sm-8">
                        <label htmlFor="bookTitle" className="form-label mb-2">Book Title:*</label>
                        <input type="text" name="bookTitle" className="form-control mb-4" value={quotation.bookTitle} onChange={handleChange} />
                    </div>
                    <div className="col-sm-2">
                        <label htmlFor="startPage" className="form-label mb-2">Start Page:*</label>
                        <input type="number" name="startPage" className="form-control mb-4" value={quotation.startPage} onChange={handleChange} />
                    </div>
                    <div className="col-sm-2">
                        <label htmlFor="endPage" className="form-label mb-2">End Page:*</label>
                        <input type="number" name="endPage" className="form-control mb-4" value={quotation.endPage} onChange={handleChange} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="publisherName" className="form-label mb-2">Publisher:*</label>
                        <input type="text" name="publisherName" className="form-control mb-4" value={quotation.publisherName} onChange={handleChange} />
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="publisherLocation" className="form-label mb-2">Location:*</label>
                        <input type="text" name="publisherLocation" className="form-control mb-4" value={quotation.publisherLocation} onChange={handleChange} />
                    </div>
                    <div className="col-sm-2">
                        <label htmlFor="yearPublished" className="form-label mb-2">Year:*</label>
                        <input type="number" name="yearPublished" className="form-control mb-4" value={quotation.yearPublished} onChange={handleChange} />
                    </div>
                </div>
                <div className="row g-3">
                    <label htmlFor="quotation" className="form-label mb-2">Quotation:*</label>
                    <textarea name="quotation" cols="30" rows="4" className="form-control mb-4" value={quotation.quotation} onChange={handleChange}></textarea>
                </div>
                <div className="row g-3">
                    <label htmlFor="comments" className="form-label mb-2">Comments:</label>
                    <textarea name="comments" cols="30" rows="4" className="form-control mb-4" value={quotation.comments} onChange={handleChange}></textarea>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button className="me-4 btn btn-danger" onClick={handleCancel}>Cancel</button>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default QuotationForm