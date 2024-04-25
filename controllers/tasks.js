const Wallet = require("../models/address_model");
const axios = require("axios");
const { response } = require("express");
require("dotenv").config();
const Url = require("url");

const getAllTransactions = async (req, res) => {
  try {
    let { query } = Url.parse(req.url, true); // for suppose we can give an api call like "http://localhost:3000/api/v1/tasks?address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"

    const Address = query.address; // then we can parse the address query and make an api call to etherscan using axios package written below.
    const apitoken = process.env.apitoken; // for security purpose it is stored in .env file.

    // this function calculate is basically a part of task 3 to calculate the balance requested address.
    const calculate = async (transactionsList) => {
      let balance = 0;
      transactionsList.forEach((transaction) => {
        if (transaction.from === Address)
          balance -= parseInt(transaction.value);
        else balance += parseInt(transaction.value);
      });
      console.log(balance);
    };

    const wallet = await Wallet.findOne({ address: Address }); // to check that whether the requested address already exists or not.

    if (wallet) {
      await calculate(wallet.transactionsList);
      return res.status(500).json({ msg: "Address already exists." });
    }

    // this is task 1 to fetch the list of “Normal” transactions for a user.
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=99999999&sort=asc&apikey=${apitoken}`;

    axios
      .get(url)
      .then(async (response) => {
        // if it is a new address which is not in database then we will store all its transactions to database. Here we will limit the number of transactions to lates 10 transactions. since in task3 we have to calculate balance also. without limiting it will give more than 100 transactions and it can cause an error of server time out.
        const newWallet = await Wallet.create({
          address: Address,
          transactionsList: response.data.result.slice(-10), // slice(-10) will store latest 10 transactions.
        });

        await calculate(newWallet.transactionsList); // after storing the address we will calculate the balance as asked in task 3.

        // console.log(newWallet);
        res.status(200).json({ msg: "Address stored." });
      })
      .catch((error) => {
        console.log("Error in axios call:", error);
        res.status(500).json({ error: "Internal server error of axios" });
      });

    // so this is part of task 3 where we have to output the price of ethereum also. we can uncommnet and check it. it will work fine. but to check the code without
    // internal server error due to unstable internet we comment it out.
    // const url2 =
    //   "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";

    // axios
    //   .get(url2)
    //   .then((response) => {
    //     res.status(200).json(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error in axios call for url2:", error);
    //     res
    //       .status(500)
    //       .json({ error: "Internal server error of axios for url2" });
    //   });
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllTransactions }; // exporting to "routes/route.js" to set routes for api calling.
