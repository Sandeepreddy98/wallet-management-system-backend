const express = require('express');
const { createWallet, getWalletDetails } = require('../controllers/walletController');
const walletRouter = express.Router();

walletRouter.post('/setup',createWallet)
walletRouter.get('/:id',getWalletDetails)

module.exports = walletRouter