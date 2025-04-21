// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Base contract to handle shared functionality like pricing (NEW CONTRACT)
//MODIFY: Added new base contract Asset
contract Asset {
    address payable public owner;  // Owner of the contract
    uint256 public listPrice = 0.01 ether; // Default listing price

    // Constructor
    constructor() {
        owner = payable(msg.sender);  // Initialize owner
    }

    // Function to update the listing price
    function updateListPrice(uint256 _listPrice) public {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice; // Update the list price
    }

    // Function to get the current listing price
    function getListPrice() public view returns (uint256) {
        return listPrice;
    }
}

// Derived contract inheriting from Asset and ERC721URIStorage (MODIFY)
//MODIFY: AssestMarket now inherits from Asset (for code reuse) and ERC721URIStorage (for NFT functionality)
contract AssestMarket is Asset, ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Counter for generating new token IDs
    Counters.Counter private _itemsSold; // Counter for tracking the number of items sold

    // Structure to  store information about a token (asset) that is listed for sale. 
    struct ListedToken {
        uint256 tokenId;        // Unique identifier for the token
        address payable owner; 
        address payable seller; 
        uint256 price;          
        bool currentlyListed;   // Whether the asset is currently listed for sale
    }

    // Mapping from token ID to the listed token's data
    mapping(uint256 => ListedToken) private idToListedToken;

    // Event to track transactions of the asset
    event CarTransaction(
        uint256 tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 price,
        string transactionType
    );

    // Constructor initializes the contract with the name "AssestMarket" and symbol "ASSM"
    constructor() ERC721("AssestMarket", "ASSM") {}

    // Function to fetch the most recently added listed token
    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current(); // Get the most recent token ID
        return idToListedToken[currentTokenId]; // Return the corresponding listed token data
    }

    // Function to fetch the details of a listed token by its token ID - CarDetails.jsx
    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId]; // Return the listed token data by token ID
    }

    // Function to fetch the current token ID being minted
    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current(); // Return the current token ID
    }

    // Function to create a new asset (mint a token), list it for sale, and set its price
    function createToken(uint256 price) public payable returns (uint) {
        require(msg.value == listPrice, "Send enough ether to list"); // Ensure correct amount of ether is sent for listing
        require(price > 0, "Price must be greater than zero"); // Price validation

        _tokenIds.increment(); // Increment token ID counter
        uint256 currentTokenId = _tokenIds.current(); // Get new token ID
        _safeMint(msg.sender, currentTokenId); // Mint a new token to the sender's address

        // Store the new asset details in the mapping
        idToListedToken[currentTokenId] = ListedToken(
            currentTokenId,
            payable(msg.sender),   // Owner of the asset is the message sender
            payable(msg.sender),   // Seller is the message sender
            price,                 // Set price of the asset
            false                  // Initially not listed for sale
        );

        return currentTokenId; // Return the newly minted token ID
    }

    // Function to list an asset for sale by the owner, with price specified
    function createListedToken(uint256 tokenId, uint256 price) public payable {
        require(msg.sender == ownerOf(tokenId), "You are not the owner of this Assest"); // Ensure the caller owns the asset
        require(price > 0, "Price must be greater than zero"); // Price validation
        require(msg.value == listPrice, "Send enough ether to list"); // Ensure correct listing fee is paid

        // Transfer the asset to the contract (acting as escrow)
        _transfer(msg.sender, address(this), tokenId);

        // Store the asset as listed and set its price
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(msg.sender), // Owner is the seller
            payable(msg.sender), // Seller is the owner of the asset
            price,               
            true                 
        );
    }

    // Function to get all the assets that are currently listed for sale
    function getAllAssest() public view returns (ListedToken[] memory) {
        uint assCount = _tokenIds.current(); 
        ListedToken[] memory tokens = new ListedToken[](assCount); // Array to hold all listed tokens

        uint currentIndex = 0;

        for (uint i = 0; i < assCount; i++) {
            uint currentId = i + 1; // Token ID starts at 1
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem; // Store the listed token in the array
            currentIndex += 1;
        }

        return tokens; // Return the array of all listed tokens
    }

    // Function to fetch assets owned or listed by the caller
    function fetchUserAssest() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current(); // Get total number of minted tokens
        uint itemCount = 0; // Counter for user assets
        uint currentIndex = 0;

        // Iterate through all assets and count how many belong to the caller (either as owner or seller)
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToListedToken[i + 1].owner == msg.sender || idToListedToken[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        // Once the count is known, create an array and store all the assets
        ListedToken[] memory items = new ListedToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToListedToken[i + 1].owner == msg.sender || idToListedToken[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem; // Store the asset in the array
                currentIndex += 1;
            }
        }
        return items; // Return the array of assets owned or listed by the user
    }

    // Function to execute the sale of an asset, transferring ownership and funds
    function executeSale(uint256 tokenId) public payable {
        ListedToken storage item = idToListedToken[tokenId]; // Fetch the asset to be sold

        require(item.currentlyListed, "This Assest is not listed for sale"); 
        require(msg.value == item.price, "Incorrect ETH amount sent");
        require(msg.sender != item.seller, "Seller cannot buy their own Assest"); // Seller cannot buy their own asset

        // Transfer the asset to the buyer
        _transfer(address(this), msg.sender, tokenId);

        // Transfer funds to the seller
        payable(item.seller).transfer(msg.value);

        // Update ownership information
        item.owner = payable(msg.sender);
        item.seller = payable(msg.sender);
        item.currentlyListed = false; // Mark the asset as no longer listed

        _itemsSold.increment(); // Increment the number of items sold

        // Send the listing fee to the contract owner
        payable(owner).transfer(listPrice);

        // Emit a transaction event for buyer and seller
        emit CarTransaction(tokenId, msg.sender, item.seller, item.price, "Received");
        emit CarTransaction(tokenId, item.seller, msg.sender, item.price, "Transfer");
    }

    // Function to cancel the trade of a listed asset
    function cancelTrade(uint256 tokenId) public {
        ListedToken storage item = idToListedToken[tokenId]; // Fetch the asset

        require(msg.sender == item.owner, "Only the seller can cancel the trade"); // Only the seller can cancel the trade
        require(item.currentlyListed, "Assest is not listed"); // Check if the asset is listed

        // Transfer the asset back to the seller
        _transfer(address(this), item.owner, tokenId);

        // Mark the asset as unlisted
        item.currentlyListed = false;
    }

}
