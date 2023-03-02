const truffleAssert = require('truffle-assertions');
const UsernameNFT = artifacts.require("UsernameNFT")

contract("Testing UsernameNFT contract", ([, ...users]) => {
    let UsernameNFTToken;
    let tokenURI = "";

    beforeEach(async () => {
        UsernameNFTToken = await UsernameNFT.new();
    });

    it("user should be able to mint an NFT", async () => {
        assert.equal(await UsernameNFTToken.balanceOf(users[0]), 0);

        await UsernameNFTToken.mint(users[0], "supercoolusername", tokenURI);

        assert.equal(await UsernameNFTToken.balanceOf(users[0]), 1);
    });

    it("usernames should be unique", async () => {
        await UsernameNFTToken.mint(users[0], "supercoolusername", tokenURI);
        await truffleAssert.reverts(
            UsernameNFTToken.mint(users[0], "supercoolusername", tokenURI),
            "Username already taken!"
        );
    });
});