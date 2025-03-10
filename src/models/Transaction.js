const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    description: { type: String, trim: true },
    type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", TransactionSchema);
