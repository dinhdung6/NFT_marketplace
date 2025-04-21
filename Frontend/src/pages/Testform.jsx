import { useState } from "react";

const categories = ["Music Art", "Digital Art", "Blockchain", "Virtual"];
const TestForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    username: "",
    price: "",
    category: categories[0], // Default category
    days: 0,
    hours: 0,
    minutes: 0,
    file: null,
  });
  const [ownedNFTs, setOwnedNFTs] = useState([]); // Store NFTs owned by the user
  const [transactions, setTransactions] = useState([]); // Store transaction history
  const [ipfsUrl, setIpfsUrl] = useState(""); // Store IPFS URL
  const [authorImage, setAuthorImage] = useState(null);
  const [authorImageUrl, setAuthorImageUrl] = useState("");

  // Function to connect to MetaMask and fetch NFT & Transaction data
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const connectedWallet = accounts[0];
        setWalletAddress(connectedWallet);

        // Fetch NFTs owned by this wallet
        fetchOwnedNFTs(connectedWallet);

        // Fetch transaction history for this wallet
        fetchTransactions(connectedWallet);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet!");
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };
  // Function to fetch NFTs owned by the connected wallet
  const fetchOwnedNFTs = async (wallet) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/nfts/owner/${wallet}`);
      if (response.ok) {
        const nfts = await response.json();
        setOwnedNFTs(nfts);
      } else {
        console.error("Failed to fetch NFTs");
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };
  // Function to fetch transaction history of the connected wallet
  const fetchTransactions = async (wallet) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/transactions/owner/${wallet}`);
      if (response.ok) {
        const txs = await response.json();
        setTransactions(txs);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
  const uploadToIPFS = async () => {
    if (!formData.file) {
      alert("Please select a file first.");
      return null;
    }
  
    const data = new FormData();
    data.append("file", formData.file); // ✅ Append file correctly
  
    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: data,
      });
  
      const result = await response.json();
      if (result.ipfs_url) {
        setIpfsUrl(result.ipfs_url); // ✅ Store the IPFS URL
        return result.ipfs_url;
      } else {
        alert("Failed to upload image to IPFS.");
        return null;
      }
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert("Error uploading image.");
      return null;
    }
  };
    const handleAuthorImageChange = (e) => {
      setAuthorImage(e.target.files[0]);
  };

  const uploadAuthorImageToIPFS = async () => {
      if (!authorImage) {
          alert("Please select an author image first.");
          return null;
      }

      const data = new FormData();
      data.append("file", authorImage);

      try {
          const response = await fetch("http://127.0.0.1:8000/upload_author_image/", {
              method: "POST",
              body: data,
          });

          const result = await response.json();
          if (result.ipfs_url) {
              setAuthorImageUrl(result.ipfs_url);
              return result.ipfs_url;
          } else {
              alert("Failed to upload author image.");
              return null;
          }
      } catch (error) {
          console.error("Error uploading author image:", error);
          alert("Error uploading author image.");
          return null;
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
  
    const ipfsImageUrl = await uploadToIPFS();
    if (!ipfsImageUrl) return; // ✅ Stop if upload fails

    const authorImageIPFS = await uploadAuthorImageToIPFS();
    if (!authorImageIPFS) return;
  
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("username", formData.username);
    data.append("price", formData.price);
    data.append("author_wallet", walletAddress);
    data.append("image_url", ipfsImageUrl); // ✅ Send IPFS URL instead of file
    data.append("author_image", authorImageIPFS); // ✅ Send author image IPFS URL
    data.append("category", formData.category);
    data.append("days", formData.days);
    data.append("hours", formData.hours);
    data.append("minutes", formData.minutes);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/add_nft/", {
        method: "POST",
        body: data,
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(`NFT Added! ID: ${result.nft_id}`);
      } else {
        const errorText = await response.text();
        alert("Failed to add NFT: " + errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding NFT");
    }
  };
  
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create NFT</h2>
      
      {/* Connect Wallet Button */}
      <button
        onClick={connectWallet}
        className="mb-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        style={{ color: "black", backgroundColor: "black"}}
      >
        {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          required
        />
         {/* ✅ Category Dropdown */}
         <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          </select>
        <input
          type="text"
          name="username"
          placeholder="Your Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (ETH)"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          required
        />
        <input
            type="file"
            onChange={handleAuthorImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-3"
            required
        />
        {authorImageUrl && (
            <div className="mb-3">
                <p>Author Image URL: <a href={authorImageUrl} target="_blank">{authorImageUrl}</a></p>
                <img src={authorImageUrl} alt="Author Image" width="100" />
            </div>
        )}
        {ipfsUrl && (
          <div className="mb-3">
            <p>IPFS URL: <a href={ipfsUrl} target="_blank">{ipfsUrl}</a></p>
            <img src={ipfsUrl} alt="Uploaded NFT" width="200" />
          </div>
        )}
        {/* ✅ Bidding Time Inputs */}
        <input type="number" name="days" placeholder="Days" value={formData.days} onChange={handleChange} />
        <input type="number" name="hours" placeholder="Hours" value={formData.hours} onChange={handleChange} />
        <input type="number" name="minutes" placeholder="Minutes" value={formData.minutes} onChange={handleChange} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          style={{ color: "black" }}
        >
          Create NFT
        </button>
      </form>
      {/* Owned NFTs Section */}
      {ownedNFTs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mt-6 mb-2" style={{ backgroundColor: "black", padding: "5px", color: "white" }}>Your NFTs</h2>
          {ownedNFTs.map((nft) => (
            <div key={nft.id} className="mb-4 p-3 border rounded">
              <h2 style={{ backgroundColor: "black", padding: "5px", color: "white" }}>{nft.item_name}</h2>
              <p style={{ color: "black" }}>{nft.item_description}</p>
              <p style={{ color: "black" }}>Author: {nft.author} (@{nft.author_wallet})</p>
              <p style={{ color: "black" }}>Owner: {nft.owner_wallet}</p>
              <p style={{ color: "black" }}>
                Current Bid: <strong>{nft.current_bid} ETH</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Transaction History Section */}
      {transactions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mt-6 mb-2" style={{ backgroundColor: "black", padding: "5px", color: "white" }}>Transaction History</h2>
          {transactions.map((tx) => (
            <div key={tx.id} className="mb-4 p-3 border rounded">
              <p style={{ color: "black" }}>
                <strong>NFT:</strong> {tx.item_name}
              </p>
              <p style={{ color: "black" }}>
                <strong>Bid Amount:</strong> {tx.bid_amount} ETH
              </p>
              <p style={{ color: "black" }}>
                <strong>Bid Time:</strong> {new Date(tx.bid_time).toLocaleString()}
              </p>
              <p style={{ color: "black" }}>
                <strong>Owner Wallet:</strong> {tx.owner_wallet}
              </p>
              <p style={{ color: "black" }}>
                <strong>Transaction Hash:</strong>{" "}
                <a
                  href={`https://etherscan.io/tx/${tx.transaction_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {tx.transaction_hash}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestForm;
