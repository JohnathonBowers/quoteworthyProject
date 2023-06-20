import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuotationForm = props => {
    const { initialQuotationData, onSubmitProp, errors, userId } = props;

    const [quotation, setQuotation] = useState(initialQuotationData);

    const navigate = useNavigate();

    const handleChange = e => {
        setQuotation({ ...quotation, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmitProp(quotation);
    };

    const handleCancel = e => {
        navigate('/quotations/user/' + userId);
    };

    return (
        <div className="container col-lg-12 mt-2">
            <p className="text-danger mb-2">* Indicates a required field</p>
            <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label
                            htmlFor="authorFirstName"
                            className="form-label mb-2"
                        >
                            Author First Name:*
                        </label>
                        <input
                            type="text"
                            name="authorFirstName"
                            className="form-control mb-2"
                            value={quotation.authorFirstName}
                            onChange={handleChange}
                        />
                        {errors && errors.authorFirstName ? (
                            <p className="text-danger mb-2">
                                {errors.authorFirstName.message}
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="col-md-6">
                        <label
                            htmlFor="authorLastName"
                            className="form-label mb-2"
                        >
                            Author Last Name:*
                        </label>
                        <input
                            type="text"
                            name="authorLastName"
                            className="form-control mb-2"
                            value={quotation.authorLastName}
                            onChange={handleChange}
                        />
                        {errors && errors.authorLastName ? (
                            <p className="text-danger mb-2">
                                {errors.authorLastName.message}
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="row g-3 mb-4">
                    <div className="col-md-8">
                        <label htmlFor="bookTitle" className="form-label mb-2">
                            Book Title:*
                        </label>
                        <input
                            type="text"
                            name="bookTitle"
                            className="form-control mb-2"
                            value={quotation.bookTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="startPage" className="form-label mb-2">
                            Start Page:*
                        </label>
                        <input
                            type="number"
                            name="startPage"
                            className="form-control mb-2"
                            value={quotation.startPage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="endPage" className="form-label mb-2">
                            End Page:*
                        </label>
                        <input
                            type="number"
                            name="endPage"
                            className="form-control mb-2"
                            value={quotation.endPage}
                            onChange={handleChange}
                        />
                    </div>
                    {errors && errors.bookTitle ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.bookTitle.message}
                        </p>
                    ) : (
                        ''
                    )}
                    {errors && errors.startPage ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.startPage.message}
                        </p>
                    ) : (
                        ''
                    )}
                    {errors && errors.endPage ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.endPage.message}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label
                            htmlFor="publisherName"
                            className="form-label mb-2"
                        >
                            Publisher:*
                        </label>
                        <input
                            type="text"
                            name="publisherName"
                            className="form-control mb-2"
                            value={quotation.publisherName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label
                            htmlFor="publisherLocation"
                            className="form-label mb-2"
                        >
                            Location:*
                        </label>
                        <input
                            type="text"
                            name="publisherLocation"
                            className="form-control mb-2"
                            value={quotation.publisherLocation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label
                            htmlFor="yearPublished"
                            className="form-label mb-2"
                        >
                            Year:*
                        </label>
                        <input
                            type="number"
                            name="yearPublished"
                            className="form-control mb-2"
                            value={quotation.yearPublished}
                            onChange={handleChange}
                        />
                    </div>
                    {errors && errors.publisherName ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.publisherName.message}
                        </p>
                    ) : (
                        ''
                    )}
                    {errors && errors.publisherLocation ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.publisherLocation.message}
                        </p>
                    ) : (
                        ''
                    )}
                    {errors && errors.yearPublished ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.yearPublished.message}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="g-3 mb-4">
                    <label htmlFor="quotation" className="form-label mb-2">
                        Quotation:*
                    </label>
                    <textarea
                        name="quotation"
                        cols="30"
                        rows="4"
                        className="form-control mb-2"
                        value={quotation.quotation}
                        onChange={handleChange}
                    ></textarea>
                    {errors && errors.quotation ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.quotation.message}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="g-3 mb-4">
                    <label htmlFor="comments" className="form-label mb-2">
                        Comments:
                    </label>
                    <textarea
                        name="comments"
                        cols="30"
                        rows="4"
                        className="form-control mb-4"
                        value={quotation.comments}
                        onChange={handleChange}
                    ></textarea>
                    {errors && errors.comments ? (
                        <p className="text-danger mt-0 mb-2">
                            {errors.comments.message}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <input
                        type="submit"
                        className="btn btn-primary me-4"
                        value="Submit"
                    />
                    <button className="btn btn-danger" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuotationForm;
