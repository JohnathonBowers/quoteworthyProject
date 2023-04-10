import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const QuotationDetails = () => {
    
    const [quotation, setQuotation] = useState({})

    const {id} = useParams()
    
    return (
        <div>

        </div>
    )
}

export default QuotationDetails