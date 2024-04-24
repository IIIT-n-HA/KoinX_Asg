const Wallet = require("../models/address_model");
const axios = require("axios");

const apitoken = "AH63RUK5RDSZ52CDVVICAKI6QJ6I8PGKTF";
const address = "0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC";
const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apitoken}`;

const getAllTransactions = async (req, res) => {
  try {
    axios
      .get(url)
      .then(async (response) => {
        const checkAddr = await Wallet.findOne({ address: address });
        if (checkAddr) {
          res.status(500).json({ msg: "Address already exists." });
        }

        const newWallet = await Wallet.create({
          address: address,
          data: response.data.result,
        });
        console.log(newWallet);
        res.status(200).json({ msg: "Address stored." });
      })
      .catch((error) => {
        console.log("Error found");
      });
  } catch (error) {
    console.log("Internal server error.");
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBalanceAndCurrEthPrice = async (req, res) => {
  try {
    const adr = req.params.address;
  } catch (error) {
    console.log("Internal server error.");
  }
};

module.exports = { getAllTransactions };
