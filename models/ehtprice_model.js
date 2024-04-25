// this our schema for task 2 to store eth price.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  Ethereum: {
    inr: Number,
  },
});

const Price = mongoose.model("Price", PriceSchema);

module.exports = Price;
