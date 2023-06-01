const Quotation = require('../models/quotation.model');

module.exports = {
    // Create a new quotation
    createNewQuotation: (req, res) => {
        Quotation.create(req.body)
            .then(createdQuotation => res.json(createdQuotation))
            .catch(err => res.status(400).json(err));
    },
    // Find all user's quotations
    findAllUserQuotations: (req, res) => {
        Quotation.find({ userId: req.params.userId })
            .sort({ authorLastName: 'asc', startPage: 'asc' })
            .then(allUserQuotations => res.json(allUserQuotations))
            .catch(err => res.status(400).json(err));
    },
    // Find one quotation
    findOneQuotation: (req, res) => {
        Quotation.findById(req.params.quotationId)
            .then(oneQuotation => res.json(oneQuotation))
            .catch(err => res.status(400).json(err));
    },
    // Update one quotation
    updateOneQuotation: (req, res) => {
        Quotation.findByIdAndUpdate(req.params.quotationId, req.body, {
            new: true,
            runValidators: true,
        })
            .then(updatedQuotation => res.json(updatedQuotation))
            .catch(err => res.status(400).json(err));
    },
    // Delete one quotation
    deleteOneQuotation: (req, res) => {
        Quotation.findByIdAndDelete(req.params.quotationId)
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.status(400).json(err));
    },
};
