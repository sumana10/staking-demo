require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");

module.exports = {

  solidity: "0.8.6",
  settings:{
    optimizer:{
      enabled:true,
      runs:200
    }
  }, 
  networks:{
    hardhat:{
      chainId:1337
    },
    amoy:{
      url:`https://polygon-amoy.infura.io/v3/${process.env.INFURA_API}`,
      accounts:[process.env.MAIN_ACCOUNT],
      chainId:80002,
    }
 
    //go to metamask and select amoy testnet
    //go to account details from the three dots option
    //select export private key
    //copy and paste pvt key .env MAIN_ACCOUNT

  },
 
}
 