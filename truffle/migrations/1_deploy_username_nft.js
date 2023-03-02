const UsernameNFT = artifacts.require("UsernameNFT");

module.exports = function (deployer) {
  deployer.deploy(UsernameNFT);
};
