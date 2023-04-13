import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const QuotationList = () => {
    
    const [quotations, setQuotations] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/quotations")
            .then(res => setQuotations(res.data))
            .catch(err => console.log(err))
    }, [])
    
    const removeFromDom = quotationId => {
        setQuotations(quotations.filter(quotation => quotation._id !== quotationId))
    }

    const deleteQuotation = quotationId => {
        axios.delete("http://localhost:8000/api/quotations/" + quotationId)
            .then(res => {removeFromDom(quotationId)})
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-4 col-lg-8">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h2><strong>Quoteworthy</strong></h2>
                <Link to="/quotations/add">Add Quotation</Link>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <h2 className="my-4">Your Collection</h2>
            </div>
            <div className="container col-sm-10">
                {
                    quotations.map((quotation, index) => {
                        return (
                            <div key={index} className="row mb-4 gx-5 shadow p-4 mb-6 rounded">
                                <div className="col-sm-10">
                                    <p className="my-2"><strong>{quotation.authorLastName}, {quotation.authorFirstName}</strong></p>
                                    <p className="my-2">{quotation.quotation}</p>
                                    {
                                            quotation.endPage === quotation.startPage ?
                                            <p><span>&#8212;</span> <em>{quotation.bookTitle}</em>, {quotation.startPage}</p> :
                                            <p><span>&#8212;</span> <em>{quotation.bookTitle}</em>, {quotation.startPage}-{quotation.endPage}</p>
                                    }
                                </div>
                                <div className="col-sm-2 dropdown">
                                    <button className="my-2 btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                                    <ul className="dropdown-menu">
                                        <li><Link to={`/quotations/${quotation._id}`} className="dropdown-item">Details</Link></li>
                                        <li><Link to={`/quotations/edit/${quotation._id}`} className="dropdown-item">Edit</Link></li>
                                        <li><Link to="#" onClick={e => deleteQuotation(quotation._id)} className="dropdown-item">Delete</Link></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QuotationList