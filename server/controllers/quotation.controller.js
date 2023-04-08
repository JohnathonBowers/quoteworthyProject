const Quotation = require("../models/quotation.model")

module.exports = {
    // Create a new quotation
    createNewQuotation: (req, res) => {
        Quotation.create(req.body)
            .then(createdQuotation => res.json(createdQuotation))
            .catch(err => res.status(400).json(err))
    },
    // Find all quotations
    findAllQuotations: (req, res) => {
        Quotation.find({}).sort({authorLastName: 'asc'})
        .then(allQuotations => res.json(allQuotations))
        .catch(err => res.status(400).json(err))
    },
    // Find one quotation
    findOneQuotation: (req, res) => {
        Quotation.findById(req.params.id)
            .then(oneQuotation => res.json(oneQuotation))
            .catch(err => res.status(400).json(err))
    },
    // Update one quotation
    updateOneQuotation: (req, res) => {
        Quotation.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .then(updatedQuotation => res.json(updatedQuotation))
            .catch(err => res.status(400).json(err))
    },
    // Delete one quotation
    deleteOneQuotation: (req, res) => {
        Quotation.findByIdAndDelete(req.params.id)
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.status(400).json(err))
    }
}