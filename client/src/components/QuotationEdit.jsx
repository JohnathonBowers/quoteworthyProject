import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import QuotationForm from './QuotationForm'

const QuotationEdit = (props) => {
    
    const {id} = useParams()

    const { firstName, logoutUser } = props

    const [quotation, setQuotation] = useState({})

    const [errors, setErrors] = useState([])

    const [loaded, setLoaded] = useState(false)

    const navigate = useNavigate()
    
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
            .then(res => {
                setQuotation(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [id])

    const updateQuotation = quotationParam => {
        axios.put("http://localhost:8000/api/quotations/" + id, quotationParam, {withCredentials: true})
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
        <div className="container mt-4 col-lg-8">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h2><strong>Quoteworthy</strong></h2>
                <div className="dropdown">
                    <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Welcome, {firstName}</button>
                    <ul className="dropdown-menu">
                        <li><Link to="#" className="dropdown-item" onClick={handleLogoutItem}>Log out</Link></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center">
                <h2 className="mt-4 mb-2">Edit Quotation</h2>
                <Link className="mb-2" to="/quotations">Back to collection</Link>
            </div>
            {
                loaded && <QuotationForm initialQuotationData={quotation} onSubmitProp={updateQuotation} errors={errors} />
            }
        </div>
    )
}

export default QuotationEdit