const QuotationController = require("../controllers/quotation.controller")

module.exports = app => {
    app.get("/api/quotations", QuotationController.findAllQuotations)
    app.get("/api/quotations/:id", QuotationController.findOneQuotation)
    app.post("/api/quotations", QuotationController.createNewQuotation)
    app.put("/api/quotations/:id", QuotationController.updateOneQuotation)
    app.delete("/api/quotations/:id", QuotationController.deleteOneQuotation)
}