import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import QuotationForm from './QuotationForm';
import Navbar from './Navbar';

const QuotationCreate = props => {
    const { userId } = useParams();

    const initialQuotationData = {
        authorFirstName: '',
        authorLastName: '',
        bookTitle: '',
        publisherName: '',
        publisherLocation: '',
        yearPublished: '',
        startPage: '',
        endPage: '',
        quotation: '',
        comments: '',
        userId: userId,
    };

    const [errors, setErrors] = useState();

    const { logoutUser, userFirstName, setUserFirstName } = props;

    const navigate = useNavigate();

    const createQuotation = quotationParam => {
        axios
            .post('/api/quotations/user/' + userId, quotationParam, {
                withCredentials: true,
            })
            .then(res => {
                navigate(`/quotations/details/${res.data._id}/user/${userId}`);
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    };

    const handleLogoutItem = e => {
        axios
            .post('/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                logoutUser();
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4 col-lg-8">
            <Navbar
                handleLogoutItem={handleLogoutItem}
                userFirstName={userFirstName}
                setUserFirstName={setUserFirstName}
            />
            <div className="d-flex flex-column align-items-center">
                <h2 className="mt-4 mb-2">Create a Quotation</h2>
                <Link className="mb-2" to={`/quotations/user/${userId}`}>
                    Back to collection
                </Link>
            </div>
            <QuotationForm
                initialQuotationData={initialQuotationData}
                onSubmitProp={createQuotation}
                errors={errors}
                userId={userId}
            />
        </div>
    );
};

export default QuotationCreate;
