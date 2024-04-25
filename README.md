# KoinX Asg


## Overview

The is a server-side application developed to fetch and manage cryptocurrency transactions for users. It provides APIs to retrieve transaction history, track Ethereum prices, and calculate user balances based on their transaction history.

## Features

* Fetch Crypto Transactions: Utilizes the Etherscan API to fetch the list of "Normal" transactions for a given user address. Transactions are stored in a MongoDB database.

* Track Ethereum Prices: Retrieves the price of Ethereum from the CoinGecko API every 10 minutes and stores it in the database.

* Calculate User Balance: Provides a GET API for users to input their address and receive their current balance along with the current price of Ether. Balances are calculated based on the user's transaction history stored in the database.

## Installation

* Clone this repository.
* Install Node.js and npm if not already installed.
* Install dependencies by running npm install.
* Get an api key from Etherscan dashboard.

## Usage

* Start the server by running npm start.
* For api testing of different routes you can use postman.

## Dependencies

* Node.js
* Express.js
* MongoDB
* Axios
* url
* dotenv
* nodemon
