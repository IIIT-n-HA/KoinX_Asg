const Wallet = require("../models/address_model");
const axios = require("axios");
require("dotenv").config();
const Url = require("url");

const getAllTransactions = async (req, res) => {
  try {
    let { query } = Url.parse(req.url, true);
    const Address = query.address;
    const apitoken = process.env.apitoken;
    const wallet = await Wallet.findOne({ address: Address });

    const calculate = async (transactionsList) => {
      let balance = 0;
      transactionsList.forEach((transaction) => {
        if (transaction.from === Address)
          balance -= parseInt(transaction.value);
        else balance += parseInt(transaction.value);
      });
      console.log(balance);
    };

    if (wallet) {
      await calculate(wallet.transactionsList);
      return res.status(500).json({ msg: "Address already exists." });
    }

    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=99999999&sort=asc&apikey=${apitoken}`;

    axios
      .get(url)
      .then(async (response) => {
        const newWallet = await Wallet.create({
          address: Address,
          transactionsList: response.data.result.slice(-10),
        });

        await calculate(newWallet.transactionsList);

        // console.log(newWallet);
        res.status(200).json({ msg: "Address stored." });
      })
      .catch((error) => {
        console.log("Error in axios call:", error);
        res.status(500).json({ error: "Internal server error of axios" });
      });
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllTransactions };
