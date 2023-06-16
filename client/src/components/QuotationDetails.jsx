import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const QuotationDetails = props => {
    const [quotation, setQuotation] = useState({});

    const { quotationId, userId } = useParams();

    const { logoutUser, userFirstName, setUserFirstName } = props;

    const navigate = useNavigate();

    const handleDeleteButton = quotationId => {
        axios
            .delete(
                'http://localhost:8000/api/quotations/' +
                    quotationId +
                    '/user/' +
                    userId,
                {
                    withCredentials: true,
                }
            )
            .then(navigate('/quotations/user/' + userId))
            .catch(err => console.log(err));
    };

    const handleLogoutItem = e => {
        axios
            .post(
                'http://localhost:8000/api/users/logout',
                {},
                { withCredentials: true }
            )
            .then(res => {
                logoutUser();
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios
            .get(
                'http://localhost:8000/api/quotations/' +
                    quotationId +
                    '/user/' +
                    userId,
                {
                    withCredentials: true,
                }
            )
            .then(res => setQuotation(res.data))
            .catch(err => console.log(err));
    }, [quotationId, userId]);

    return (
        <div className="container mt-4 col-lg-8">
            <Navbar
                handleLogoutItem={handleLogoutItem}
                userFirstName={userFirstName}
                setUserFirstName={setUserFirstName}
            />
            <div className="d-flex flex-column align-items-center">
                <h2 className="mt-4 mb-2">Quotation Details</h2>
                <Link className="mb-2" to={`/quotations/user/${userId}`}>
                    Back to collection
                </Link>
            </div>
            <div className="container col-lg-10 mb-5">
                <h5 className="mt-4 shadow-sm p-4 mb-5 bg-body-tertiary rounded">
                    {quotation.quotation}
                </h5>
                <p className="mt-4 mb-2">
                    <strong>Citation Information:</strong>
                </p>
                {quotation.endPage === quotation.startPage ? (
                    <p>
                        <span>&#8212;</span> {quotation.authorFirstName}{' '}
                        {quotation.authorLastName},{' '}
                        <em>{quotation.bookTitle}</em> (
                        {quotation.publisherLocation}: {quotation.publisherName}
                        , {quotation.yearPublished}), {quotation.startPage}
                    </p>
                ) : (
                    <p>
                        <span>&#8212;</span> {quotation.authorFirstName}{' '}
                        {quotation.authorLastName},{' '}
                        <em>{quotation.bookTitle}</em> (
                        {quotation.publisherLocation}: {quotation.publisherName}
                        , {quotation.yearPublished}), {quotation.startPage}-
                        {quotation.endPage}
                    </p>
                )}
                {quotation.comments ? (
                    <div>
                        <p className="mt-5 mb-2">
                            <strong>Your Comments:</strong>
                        </p>
                        <p className="mb-5">{quotation.comments}</p>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="mt-4 d-flex flex-row justify-content-center">
                <button
                    className="me-4 btn btn-warning"
                    onClick={e =>
                        navigate(
                            '/quotations/edit/' +
                                quotationId +
                                '/user/' +
                                userId
                        )
                    }
                >
                    Edit Quotation
                </button>
                <button
                    className="btn btn-danger"
                    onClick={e => handleDeleteButton(quotation._id)}
                >
                    Delete Quotation
                </button>
            </div>
        </div>
    );
};

export default QuotationDetails;
