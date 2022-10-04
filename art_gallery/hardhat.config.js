require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(account.address);
    }
  });

  task("deploy", "Deploy the smart contracts", async(taskArgs, hre) => {

    const Artwork = await hre.ethers.getContractFactory("Artwork");
    const artwork = await Artwork.deploy("Artwork Contract", "ART");
  
    await artwork.deployed();
  
    console.log("Contract Address: " + artwork.address);

    await hre.run("verify:verify", {
      address: artwork.address,
      constructorArguments: [
        "Artwork Contract",
        "ART"
      ]
    })
  
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [
        process.env.PRIVATE_KEY,
      ]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY,
  }
};
