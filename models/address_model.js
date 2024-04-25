// this is our schema for task 1 to store transactions.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the wallet schema
const WalletSchema = new Schema({
  address: { type: String, required: true, unique: true },
  transactionsList: [], // Array of transactions
});

// Create a model for the wallet schema
const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
