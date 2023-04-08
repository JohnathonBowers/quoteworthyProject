const Quotation = require("../models/quotation.model")

module.exports = {
    // Create a new quotation
    createNewQuotation: (req, res) => {
        Quotation.create(req.body)
            .then(createdQuotation => res.json(createdQuotation))
            .catch(err => res.status(400).json(err))
    },
    // Delete one quotation
    deleteOneQuotation: (req, res) => {
        Quotation.findByIdAndDelete(req.params.id)
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.status(400).json(err))
    }
}