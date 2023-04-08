const QuotationController = require("../controllers/quotation.controller")

module.exports = app => {
    app.post("/api/quotations", QuotationController.createNewQuotation)
}