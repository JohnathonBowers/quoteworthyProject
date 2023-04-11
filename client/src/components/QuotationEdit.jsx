import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import QuotationForm from './QuotationForm'

const QuotationEdit = () => {
    
    const {id} = useParams()

    const [quotation, setQuotation] = useState({})

    const [errors, setErrors] = useState([])

    const [loaded, setLoaded] = useState(false)

    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/quotations/" + id)
            .then(res => {
                setQuotation(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [id])

    const updateQuotation = quotationParam => {
        axios.put("http://localhost:8000/api/quotations/" + id, quotationParam)
            .then(res => {
                console.log(res.data)
                navigate("/quotations/" + id)
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
        <div>
            <div className="container mt-4 col-sm-8">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h2><strong>Quoteworthy</strong></h2>
                <Link to="/quotations">View Collection</Link>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <h2 className="my-4">Edit Quotation</h2>
            </div>
            {
                loaded && <QuotationForm initialQuotationData={quotation} onSubmitProp={updateQuotation} errors={errors} />
            }
            </div>
        </div>
    )
}

export default QuotationEdit