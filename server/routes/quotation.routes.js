const QuotationController = require("../controllers/quotation.controller")

module.exports = app => {
    app.get("/api/quotations", QuotationController.findAllQuotations)
    app.post("/api/quotations", QuotationController.createNewQuotation)
    app.delete("/api/quotations/:id", QuotationController.deleteOneQuotation)
}