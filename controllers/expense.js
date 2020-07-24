const ExpenseReceipt = require('../models').ExpenseReceipt;

exports.createExpense = async (req, res, next) => {
  if (req.files.length > 0) {
    try {
      const expenseReceipts = req.files.map(async (file) => {
        const createdExpense = await ExpenseReceipt.create({
          expenseId: req.body.expenseId,
          receipt: 'http://localhost:3001/images/userExpenses/' + file.filename,
        });

        return createdExpense;
      });

      const expenses = await Promise.all(expenseReceipts);

      res.status(201).json({
        message: 'Reciepts Added!',
        data: expenses,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } else {
    res.status(404).json({
      message: 'Not Files Found!',
    });
  }
};

exports.uploadLogo = async (req, res, next) => {
  if (req.files.length > 0) {
    try {
      const companyLogo = req.files.map(async (file) => {
        const logo = {
          logo: 'http://localhost:3001/images/userExpenses/' + file.filename,
        };

        return logo;
      });
      const logo = await Promise.all(companyLogo);
      res.status(201).json({
        message: 'Logo Uploaded!',
        data: logo,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } else {
    res.status(404).json({
      message: 'Not Files Found!',
    });
  }
};
