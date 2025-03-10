const express = require('express');
const { transact, getTransactions } = require('../controllers/transactionController');
const transactionRouter = express.Router();

transactionRouter.post('/:walletId', transact);
transactionRouter.get('/', getTransactions);

module.exports = transactionRouter