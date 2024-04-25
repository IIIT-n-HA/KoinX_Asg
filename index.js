const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const tasks = require("./routes/route");
const axios = require("axios");
const Price = require("./models/ehtprice_model");

//middleware
app.use(express.json());

//randomly selecting a port
const port = 3000;

//we will this api for getting all transactions for a given address. For more detalis head over to "routes/route.js" and "controllers/tasks.js".
app.use("/api/v1/tasks", tasks);

// connecting to the database(MongoDB)
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// this is the main function where will be starting our server by connecting it to the database.
const start = async () => {
  try {
    await connectDB(process.env.dburl);
    app.listen(port, () => {
      console.log(`Server is listening at ${port}`);
    });

    // this is our task 2 to fetch the price of Ethereum every 10 minutes and store it in the database.
    setInterval(() => {
      url =
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";
      axios
        .get(url)
        .then(async (response) => {
          const newPrice = await Price.create({
            Ethereum: {
              inr: response.data.ethereum.inr,
            },
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log({ msg: "Error found" });
        });
    }, 10 * 60 * 1000);
  } catch (error) {
    console.log("Unable to start the server.");
  }
};

start();
