const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");

const transact = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount, description } = req.body;
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const newBalance = wallet.balance + amount;
    if (newBalance < 0) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const transaction = new Transaction({
      walletId,
      amount,
      balance: newBalance,
      description,
      type: amount > 0 ? "CREDIT" : "DEBIT",
    });

    await transaction.save();
    wallet.balance = newBalance;
    await wallet.save();
    res
      .status(200)
      .json({ balance: newBalance, transactionId: transaction._id });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { walletId, skip = 0, limit = 10 } = req.query;
    const transactions = await Transaction.find({ walletId })
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { transact, getTransactions };
