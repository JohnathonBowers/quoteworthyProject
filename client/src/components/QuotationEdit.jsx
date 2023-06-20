import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import QuotationForm from './QuotationForm';
import Navbar from './Navbar';

const QuotationEdit = props => {
    const { quotationId, userId } = useParams();

    const { logoutUser, userFirstName, setUserFirstName } = props;

    const [quotation, setQuotation] = useState({});

    const [errors, setErrors] = useState();

    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    const handleLogoutItem = e => {
        axios
            .post('/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                logoutUser();
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios
            .get('/api/quotations/' + quotationId + '/user/' + userId, {
                withCredentials: true,
            })
            .then(res => {
                setQuotation(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [quotationId, userId]);

    const updateQuotation = quotationParam => {
        axios
            .put(
                '/api/quotations/' + quotationId + '/user/' + userId,
                quotationParam,
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                navigate(
                    '/quotations/details/' + quotationId + '/user/' + userId
                );
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="container mt-4 col-lg-8">
            <Navbar
                handleLogoutItem={handleLogoutItem}
                userFirstName={userFirstName}
                setUserFirstName={setUserFirstName}
            />
            <div className="d-flex flex-column align-items-center">
                <h2 className="mt-4 mb-2">Edit Quotation</h2>
                <Link className="mb-2" to={`/quotations/user/${userId}`}>
                    Back to collection
                </Link>
            </div>
            {loaded && (
                <QuotationForm
                    initialQuotationData={quotation}
                    onSubmitProp={updateQuotation}
                    userId={userId}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default QuotationEdit;
