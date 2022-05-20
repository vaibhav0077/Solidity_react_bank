
const hre = require("hardhat");

async function main() {

    const ReactBank = await hre.ethers.getContractFactory("etherTranscation");
    const reactbank = await ReactBank.deploy();

    await reactbank.deployed();

    console.log("ReactBank deployed to:", reactbank.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
