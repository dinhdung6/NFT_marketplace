import { useState, useEffect } from "react";
import Web3 from "web3";
import contractABI from "../contractABI.json";
import contractAddress from "../config"; // Ensure correct import


const ItemDetails = () => {
  const [nfts, setNfts] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    fetchNFTs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdowns();
    }, 1000);

    return () => clearInterval(interval);
  }, [nfts]);

  
  const fetchNFTs = async () => {
    try {
      console.log("📌 Fetching NFTs from backend...");
      const response = await fetch("http://localhost:8000/nfts/");
      if (!response.ok) throw new Error("Failed to fetch NFTs");
      const data = await response.json();
      console.log("✅ NFTs fetched successfully:", data);
      setNfts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCountdowns = (nftData = nfts) => {
    const newCountdowns = {};
    nftData.forEach((nft) => {
      if (nft.bidding_end_time) {
        const endTime = new Date(nft.bidding_end_time).getTime();
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft > 0) {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          newCountdowns[nft.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[nft.id] = "Auction Ended";
        }
      } else {
        newCountdowns[nft.id] = "No End Time Set";
      }
    });
    setCountdowns(newCountdowns);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          setAccount(web3.utils.toChecksumAddress(accounts[0])); // Standardize address format
          console.log("✅ Wallet Connected:", accounts[0]);
        } else {
          alert("No Ethereum account detected.");
        }
      } catch (err) {
        alert("Failed to connect wallet: " + err.message);
      }
    } else {
      alert("MetaMask not installed");
    }
  };

  const handleBidChange = (id, value) => {
    setBidAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const placeBid = async (e, nft) => {
    e.preventDefault();
    if (!account) {
      return alert("Connect MetaMask first");
    }

    const bidAmount = bidAmounts[nft.id];
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
      return alert("Enter a valid bid amount in ETH");
    }

    if (parseFloat(bidAmount) <= nft.current_bid) {
      return alert(`Bid must be higher than current bid (${nft.current_bid} ETH)`);
    }

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const formattedAccount = web3.utils.toChecksumAddress(account);
      const gasPrice = await web3.eth.getGasPrice();
      // ✅ Log blockchain state before bidding
      const nftData = await contract.methods.nfts(nft.id).call();
      console.log("📌 Blockchain NFT State Before Transaction:", nftData);

      console.log(`📌 Placing bid on NFT ID: ${nft.id} | Amount: ${bidAmount} ETH | From: ${formattedAccount}`);

      // Submit transaction to blockchain
      const tx = await contract.methods.placeBid(nft.id).send({
        from: formattedAccount,
        value: web3.utils.toWei(bidAmount, "ether"),
        gasPrice: gasPrice,
      });

      console.log("📌 Transaction Sent, Waiting for Confirmation...", tx.transactionHash);

      // Wait for transaction confirmation
      let receipt = null;
      while (!receipt) {
        console.log("⏳ Checking transaction receipt...");
        receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s before retrying
      }

      if (!receipt.status) {
        return alert("Transaction failed on blockchain.");
      }

      console.log("✅ Transaction Confirmed:", receipt.transactionHash);

      // ✅ Prepare request body for backend
      const requestBody = {
        item_id: nft.id, // NFT ID
        item_name: nft.item_name, // NFT Name
        bid_amount: web3.utils.fromWei(web3.utils.toWei(bidAmount, "ether"), "ether"), // Convert to ETH
        bid_time: new Date().toISOString(), // Timestamp
        owner_wallet: formattedAccount, // New highest bidder
        author_wallet: nft.author_wallet, // Original creator
        transaction_hash: receipt.transactionHash, // Transaction Hash
      };

      console.log("📌 Sending Data to Backend:", requestBody);

      // ✅ Send data as JSON
      const response = await fetch(`http://localhost:8000/bid/${nft.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("📌 Backend Response:", data);

      if (!response.ok) {
        alert("Backend Error: " + JSON.stringify(data.detail, null, 2));
        return;
      }

      alert("🎉 Bid successful! Txn Hash: " + data.transaction_hash);
      setTimeout(fetchNFTs, 1000); // Refresh NFTs

    } catch (error) {
      console.error("❌ Transaction failed:", error);
      alert("Transaction failed: " + error.message);
    }
  };

  if (error) return <p style={{ color: "black" }}>Error: {error}</p>;
  if (nfts.length === 0) return <p style={{ color: "black" }}>Loading NFTs...</p>;
  

  // Inline styles for the page
  const pageStyle = {
    backgroundImage: 'url(../images/dark-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: '120px 0',
    position: 'relative',
  };

  const afterStyle = {
    backgroundImage: 'url(/assets/images/category-collection-dec.png)',
    width: '300px',
    height: '282px',
    position: 'absolute',
    bottom: '0',
    right: '30px',
    content: "''",
    zIndex: 1,
  };

  const imageStyle = {
    borderRadius: '20px',
  };

  const authorImageStyle = {
    maxWidth: '50px',
    borderRadius: '50%',
  };

  const bidStyle = {
    fontSize: '14px',
  };

  const ownerStyle = {
    fontSize: '14px',
  };

  const endsStyle = {
    fontSize: '14px',
  };

  const buttonStyle = {
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#7453fc',
    border: '1px solid #7453fc',
    padding: '12px 30px',
    display: 'inline-block',
    borderRadius: '25px',
    fontWeight: '500',
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
    transition: 'all .3s',
    position: 'relative',
    overflow: 'hidden',
  };

  const buttonHoverStyle = {
    backgroundColor: '#fff',
    color: '#7453fc',
    border: '1px solid #fff',
  };

  return (
    <div className="item-details-page" style={pageStyle}>
      <button onClick={connectWallet} style={{ color: "orange", padding: "10px", border: "1px solid black", position: "absolute"}}>
        {account ? `Connected: ${account}` : "Connect MetaMask"}
      </button>
      {nfts.map((nft) => (
        <div key={nft.id} className="row" style={{marginBottom: "50px" }}>
          <div className="col-lg-7">
            <div className="left-image">
              {/* NFT Image */}
              {nft.img_url ? (
                <img
                  src={nft.img_url}
                  alt="NFT Preview"
                  style={imageStyle}
                />
              ) : (
                <p style={{ color: "black" }}>No Image Available</p>
              )}
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <h4>{nft.item_name}</h4>
            <span className="author">
              {nft.author_image ? (
              <img
                src={nft.author_image}
                alt={`${nft.author}'s profile`}
                style={authorImageStyle}
              />
              ) : (
                <p style={{ color: "black", marginRight: "10px" }}>No Author Image</p>
              )}
              <h6>
              Author: {nft.author} <br />
                <a href="#">(@{nft.author_wallet})</a>
              </h6>
            </span>
            <p>
            {nft.item_description}
            </p>
            <div className="row">
              <div className="col-3">
                <span className="bid" style={bidStyle}>
                  Current Bid: <strong>{nft.current_bid} ETH</strong>
                </span>
              </div>
              <div className="col-4">
                <span className="owner" style={ownerStyle}>
                  Owner<br />
                  <strong>{nft.owner_wallet}</strong><br />
                  <em>@{nft.owner_wallet}</em>
                </span>
              </div>

            </div>
            {countdowns[nft.id] !== "Auction Ended" ? (
            <form onSubmit={(e) => placeBid(e, nft)}>
              <label htmlFor="quantity-text">Place Bid:</label>
                <input 
                placeholder="Enter bid" 
                className="quantity-text" 
                value={bidAmounts[nft.id] || ""} 
                onChange={(e) => handleBidChange(nft.id, e.target.value)}
              />
              <button
                type="submit"
                id="form-submit"
                className="main-button"
                style={buttonStyle}
                onMouseOver={e => e.target.style = buttonHoverStyle}
                onMouseOut={e => e.target.style = buttonStyle}
              >
                Submit Bid
              </button>
              {/* Countdown Timer */}
              <p style={{ color: "red", fontWeight: "bold" }}>
                Time Left: {countdowns[nft.id] || "Calculating..."}
              </p>
            </form>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>Bidding has ended</p>
          )}
          </div>
        </div>
      ))}

      
      
      
      <div style={afterStyle}></div>
    </div>
    


  );
};

export default ItemDetails;



