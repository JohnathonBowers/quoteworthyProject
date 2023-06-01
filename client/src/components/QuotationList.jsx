import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const QuotationList = props => {
    const [quotations, setQuotations] = useState([]);

    const { logoutUser } = props;

    const { userId } = useParams();

    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/quotations/user/' + userId, {
                withCredentials: true,
            })
            .then(res => {
                setQuotations(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [userId]);

    const removeFromDom = quotationId => {
        setQuotations(
            quotations.filter(quotation => quotation._id !== quotationId)
        );
    };

    const deleteQuotation = quotationId => {
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
            .then(res => {
                removeFromDom(quotationId);
            })
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

    return (
        <div className="container mt-4 col-lg-8">
            <Navbar handleLogoutItem={handleLogoutItem} userId={userId} />
            <div className="d-flex flex-column align-items-center">
                <h2 className="mt-4 mb-2">Your Collection</h2>
                <Link className="mb-4" to={`/quotations/add/user/${userId}`}>
                    Add Quotation
                </Link>
            </div>
            {loaded && (
                <div className="container col-sm-10">
                    {quotations.length ? (
                        quotations.map((quotation, index) => {
                            return (
                                <div
                                    key={index}
                                    className="row mb-4 gx-5 shadow p-4 mb-6 rounded"
                                >
                                    <div>
                                        <p className="my-2">
                                            <strong>
                                                {quotation.authorLastName},{' '}
                                                {quotation.authorFirstName}
                                            </strong>
                                        </p>
                                        <p className="my-2">
                                            {quotation.quotation}
                                        </p>
                                        {quotation.endPage ===
                                        quotation.startPage ? (
                                            <p>
                                                <span>&#8212;</span>{' '}
                                                <em>{quotation.bookTitle}</em>,{' '}
                                                {quotation.startPage}
                                            </p>
                                        ) : (
                                            <p>
                                                <span>&#8212;</span>{' '}
                                                <em>{quotation.bookTitle}</em>,{' '}
                                                {quotation.startPage}-
                                                {quotation.endPage}
                                            </p>
                                        )}
                                    </div>
                                    <div className="dropdown">
                                        <button
                                            className="mb-2 btn btn-primary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Actions
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link
                                                    to={`/quotations/details/${quotation._id}/user/${userId}`}
                                                    className="dropdown-item"
                                                >
                                                    Details
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/quotations/edit/${quotation._id}/user/${userId}`}
                                                    className="dropdown-item"
                                                >
                                                    Edit
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    onClick={e =>
                                                        deleteQuotation(
                                                            quotation._id
                                                        )
                                                    }
                                                    className="dropdown-item"
                                                >
                                                    Delete
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h5 className="text-secondary">
                            No quotations yet! Click the "Add Quotation" link
                            above to add your first quotation.
                        </h5>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuotationList;
