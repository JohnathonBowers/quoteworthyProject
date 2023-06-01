const QuotationController = require('../controllers/quotation.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get(
        '/api/quotations/user/:userId',
        authenticate,
        QuotationController.findAllUserQuotations
    );
    app.get(
        '/api/quotations/:quotationId/user/:userId',
        authenticate,
        QuotationController.findOneQuotation
    );
    app.post(
        '/api/quotations/user/:userId',
        authenticate,
        QuotationController.createNewQuotation
    );
    app.put(
        '/api/quotations/:quotationId/user/:userId',
        authenticate,
        QuotationController.updateOneQuotation
    );
    app.delete(
        '/api/quotations/:quotationId/user/:userId',
        authenticate,
        QuotationController.deleteOneQuotation
    );
};
