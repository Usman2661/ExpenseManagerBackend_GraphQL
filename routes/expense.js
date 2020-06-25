const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expense');
const uploadReceipts = require('../middleware/multer');

router.post('/', uploadReceipts.saveReciepts, ExpenseController.createExpense);

module.exports = router;
