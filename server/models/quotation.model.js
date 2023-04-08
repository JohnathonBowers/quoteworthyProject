const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
    authorFirstName: {
        type: String,
        required: [true, "Author's first name is required."],
        minlength: [2, "Author's first name must be at least two characters long."],
        maxlength: [30, "Author's first name must not be longer than 30 characters."]
    },
    authorLastName: {
        type: String,
        required: [true, "Author's last name is required."],
        minlength: [2, "Author's last name must be at least two characters long."],
        maxlength: [30, "Author's last name must not be longer than 30 characters."]
    },
    bookTitle: {
        type: String,
        required: [true, "Book title is required."],
        minlength: [2, "Book title must be at least two characters long."],
        maxlength: [50, "Book title must not be longer than 50 characters."]
    },
    publisherName: {
        type: String,
        required: [true, "Publisher name is required."],
        minlength: [2, "Publisher name must be at least two characters long."],
        maxlength: [30, "Publisher name must not be longer than 30 characters."]
    },
    publisherLocation: {
        type: String,
        required: [true, "Publisher location is required."],
        minlength: [2, "Publisher location must be at least two characters long."],
        maxlength: [30, "Publisher location must not be longer than 30 characters."]
    },
    yearPublished: {
        type: String,
        required: [true, "Year of publication is required."],
        min: [1, "Year must be 1 or higher."],
        max: [2050, "Year must be 2050 or below."]
    },
    startPage: {
        type: Number,
        required: [true, "Start page is required."],
        min: [1, "Start page must be 1 or higher."],
        max: [10000, "Start page must not be greater than 10,000."]
    },
    endPage: {
        type: Number,
        required: [true, "End page is required."],
        validate: {
            validator: function endPageValidator(value) {
                return value >= this.startPage;
            },
            message: "End page must be greater than or equal to start page."
        },
        min: [1, "End page must be 1 or higher."],
        max: [10000, "End page must not be greater than 10,000."]
    },
    quotation: {
        type: String,
        required: [true, "Quotation is required."],
        minlength: [2, "Quotation must be at least two characters long."],
        maxlength: [1000, "Quotation must not be longer than 1,000 characters."]
    },
    comments: {
        type: String,
        maxlength: [1000, "Comments must not be longer than 1,000 characters."]
    }
}, { timestamps: true });

module.exports = mongoose.model("Quotation", QuotationSchema);