const mongoose = require("mongoose");
const WalletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      trim: true,
    },
    balance: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Wallet", WalletSchema);
