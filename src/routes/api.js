const express = require('express');
const walletRouter = require('./walletRoutes');
const transactionRouter = require('./transactionRoutes');
const apiRouter = express.Router()

apiRouter.use(express.json());

apiRouter.use('/wallet',walletRouter)
apiRouter.use('/transact',transactionRouter)

module.exports = apiRouter