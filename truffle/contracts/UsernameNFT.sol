pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UsernameNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Existing usernames mapped to the owners
    mapping(string => address) private _existingUsernames;

    // Some arbitrary amount
    uint public constant MAX_SUPPLY = 1000000;

    constructor() ERC721("UsernameNFT", "USR") {}

    function mint(address _account, string memory _username, string memory _tokenURI) public returns (uint256) {
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply has been reached!");
        require(isUsernameTaken(_username), "Username already taken!");

        _tokenIds.increment();
        uint256 _newTokenId = _tokenIds.current();

        _mint(_account, _newTokenId);
        _setTokenURI(_newTokenId, _tokenURI);

        _existingUsernames[_username] = _account;
        return _newTokenId;
    }

    function isUsernameTaken(string memory _username) internal view returns (bool) {
        // Idk of another way to do this
        return _existingUsernames[_username] == address(0);
    }

    function transfer(address _from, address _to, uint256 _tokenId) public {
        transferFrom(_from, _to, _tokenId);
    }

    function getUsernameOwner(string memory _username) public view returns (address) {
        return _existingUsernames[_username];
    }
}


