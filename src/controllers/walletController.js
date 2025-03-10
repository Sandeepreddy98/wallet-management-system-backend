const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

const createWallet = async (req,res) => {
    try {
        const { name, balance } = req.body;
        const wallet = new Wallet({ name, balance });
        await wallet.save();
        const transaction = new Transaction({
          walletId: wallet._id,
          amount: balance,
          balance,
          description: 'Setup',
          type: 'CREDIT'
        });
        await transaction.save();
        res.status(200).json({ _id: wallet._id, balance: wallet.balance, name: wallet.name, date: wallet.createdAt });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getWalletDetails = async (req,res) => {
    try {
        const wallet = await Wallet.findById(req.params.id);
        if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
        res.status(200).json({ _id: wallet._id, balance: wallet.balance, name: wallet.name, date: wallet.createdAt });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {createWallet,getWalletDetails}