exports.createExpense = async (req, res, next) => {
  console.log(req.files);

  res.status(201).json({
    message: 'Create Expense!',
  });
};
