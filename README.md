# Deploy and Set Up a Staking dApp on the Polygon Amoy Testnet

## Overview

This guide walks you through deploying a staking dApp to the Polygon Amoy Testnet, including setting up your development environment, deploying contracts, and running the client application.

## General Setup

1. **Add Polygon Amoy Testnet to MetaMask**

   - [Add Polygon Amoy to MetaMask](https://support.polygon.technology/support/solutions/articles/82000907114-how-to-add-amoy-network-in-your-wallet-)
   - Acquire some Amoy testnet ETH: [Get Amoy Testnet ETH](https://faucet.polygon.technology/)

2. **Clone the Repository**

   ```shell
   git clone https://github.com/sumana10/staking-demo
   ```

3. **Navigate to the Project Directory**

   ```shell
   cd staking-demo
   ```

4. **Install Project Dependencies**

   ```shell
   npm install
   ```

## Hardhat Configuration

1. **Create and Configure Hardhat Project**

   - Open or create `hardhat.config.js` in the root of your project and add the following configuration:

   ```js
   require("dotenv").config();
   require("@nomicfoundation/hardhat-toolbox");
   require("@nomiclabs/hardhat-etherscan");

   module.exports = {
     solidity: "0.8.6",
     settings: {
       optimizer: {
         enabled: true,
         runs: 200,
       },
     },
     networks: {
       hardhat: {
         chainId: 1337,
       },
       amoy: {
         url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API}`,
         accounts: [process.env.MAIN_ACCOUNT],
         chainId: 80002,
       },
     },
   };
   ```

2. **Set Up Environment Variables**

   - Copy the sample environment file:

   ```shell
   cp .env.sample .env
   ```

   - Update `.env` with your Infura API key and your MetaMask main account private key. For details on obtaining your private key from MetaMask, refer to [this guide](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed).

## Deploying the Staking Contract


2. **Start the Hardhat Node**

   ```shell
   npx hardhat node
   ```

3. **Deploy the Contract**

   In a new terminal, run:

   ```shell
   npx hardhat run scripts/deploy.js --network amoy
   ```

## Running the Client Application

1. **Navigate to the Client Directory**

   ```shell
   cd client
   ```

2. **Install Client Dependencies**

   ```shell
   npm install
   ```

3. **Start the Client Application**

   ```shell
   npm run dev
   ```

## Additional Information

For more details, check out the [staking-demo repository](https://github.com/sumana10/staking-demo).

---

This guide will help you set up and deploy your staking dApp on the Polygon Amoy Testnet, ensuring you have the necessary configurations and steps to get everything running smoothly.