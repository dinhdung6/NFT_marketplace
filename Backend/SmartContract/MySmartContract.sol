// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTBidding is ERC721URIStorage, Ownable, ReentrancyGuard {
    using EnumerableSet for EnumerableSet.UintSet;
    using Address for address payable;

    struct NFT {
        uint256 id;
        string name;
        address owner;
        uint256 currentBid;
        address highestBidder;
        bool active;
        uint256 auctionEndTime;
    }

    mapping(uint256 => NFT) private nfts;
    EnumerableSet.UintSet private nftIds;
    uint256 public nftCount;

    event NFTCreated(uint256 indexed id, string name, address indexed owner);
    event BidPlaced(uint256 indexed id, address indexed bidder, uint256 bidAmount);
    event NFTTransferred(uint256 indexed id, address indexed newOwner, uint256 finalAmount);
    event NFTUpdated(uint256 indexed id, string newName);
    event BidRefunded(uint256 indexed id, address indexed bidder, uint256 amount);

    modifier onlyNFTOwner(uint256 _id) {
        require(nfts[_id].owner == msg.sender, "Only NFT owner can finalize");
        _;
    }

    modifier onlyNFTAuthor(uint256 _id) {
        require(nfts[_id].owner == msg.sender, "Only the NFT author can modify");
        _;
    }

    constructor() ERC721("NFTBidding", "NFTB") Ownable(msg.sender) {}

    receive() external payable {}

    function createNFT(string memory _name, string memory _tokenURI, uint256 _auctionDuration) public {
        nftCount++;
        uint256 auctionEndTime = block.timestamp + _auctionDuration;
        nfts[nftCount] = NFT(nftCount, _name, msg.sender, 0, address(0), true, auctionEndTime);
        nftIds.add(nftCount);
        _mint(msg.sender, nftCount);
        _setTokenURI(nftCount, _tokenURI);
        emit NFTCreated(nftCount, _name, msg.sender);
    }

    function updateNFTName(uint256 _id, string memory _newName) public onlyNFTAuthor(_id) {
        require(nfts[_id].active, "Cannot update inactive NFT");
        nfts[_id].name = _newName;
        emit NFTUpdated(_id, _newName);
    }

    function placeBid(uint256 _id) public payable nonReentrant {
        require(nftIds.contains(_id), "Invalid NFT ID");
        require(nfts[_id].active, "NFT is not active for bidding");
        require(block.timestamp <= nfts[_id].auctionEndTime, "Auction has ended");
        require(msg.value > nfts[_id].currentBid, "Bid must be higher than current bid");
        
        address previousBidder = nfts[_id].highestBidder;
        uint256 previousBid = nfts[_id].currentBid;

        // Update highest bid
        nfts[_id].currentBid = msg.value;
        nfts[_id].highestBidder = msg.sender;

        if (previousBidder != address(0)) {
            payable(previousBidder).sendValue(previousBid);
            emit BidRefunded(_id, previousBidder, previousBid);
        }

        emit BidPlaced(_id, msg.sender, msg.value);
    }

    function finalizeAuction(uint256 _id) public onlyNFTOwner(_id) nonReentrant {
        require(nfts[_id].active, "Auction is already closed");
        require(nfts[_id].highestBidder != address(0), "No bids placed");
        require(block.timestamp > nfts[_id].auctionEndTime, "Auction is still ongoing");

        nfts[_id].active = false; // Close auction
        address previousOwner = nfts[_id].owner;
        address winner = nfts[_id].highestBidder;
        uint256 finalPrice = nfts[_id].currentBid;
        
        nfts[_id].owner = winner;
        _transfer(previousOwner, winner, _id);

        // Securely transfer funds
        payable(previousOwner).sendValue(finalPrice);

        emit NFTTransferred(_id, winner, finalPrice);
    }
}
