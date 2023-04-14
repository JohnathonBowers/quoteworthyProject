const QuotationController = require("../controllers/quotation.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = app => {
    app.get("/api/quotations", authenticate, QuotationController.findAllQuotations)
    app.get("/api/quotations/:id", authenticate, QuotationController.findOneQuotation)
    app.post("/api/quotations", authenticate, QuotationController.createNewQuotation)
    app.put("/api/quotations/:id", authenticate, QuotationController.updateOneQuotation)
    app.delete("/api/quotations/:id", authenticate, QuotationController.deleteOneQuotation)
}