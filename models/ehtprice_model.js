const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  Ethereum: {
    inr: Number,
  },
});

const Price = mongoose.model("Price", PriceSchema);

module.exports = Price;
