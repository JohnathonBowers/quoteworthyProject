const QuotationController = require("../controllers/quotation.controller")

module.exports = app => {
    app.post("/api/quotations", QuotationController.createNewQuotation)
    app.delete("/api/quotations/:id", QuotationController.deleteOneQuotation)
}