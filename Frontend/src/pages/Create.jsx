import React, { useState } from 'react';

function Create() {
  const categories = ["Music Art", "Digital Art", "Blockchain", "Virtual"];
  const [isActive, setIsActive] = useState(false);
            const [isMenuVisible, setIsMenuVisible] = useState(false);
        
            const handleClick = () => {
                setIsActive(!isActive); // Toggle the 'active' class
                setIsMenuVisible(!isMenuVisible); // Toggle menu visibility
            };
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
    <>
    {/* ***** Preloader Start ***** */}
    <div id="js-preloader" className="js-preloader">
      <div className="preloader-inner">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    {/* ***** Preloader End ***** */}

    {/* ***** Header Area Start ***** */}
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* ***** Logo Start ***** */}
              <a href="/" className="logo">
                <img src="assets/images/pixie.png" alt="Logo" />
              </a>
              {/* ***** Logo End ***** */}
              {/* ***** Menu Start ***** */}
              <ul className={`nav ${isMenuVisible ? 'visible' : ''}`}>
                            <li>
                            <a href="/" >Home</a>
                            </li>
                            <li>
                            <a href="/explore">Explore</a>
                            </li>
                            <li>
                            <a href="/details">Item Details</a>
                            </li>
                            <li>
                            <a href="/author">Author</a>
                            </li>
                            <li>
                            <a href="/create" className="active">Create Yours</a>
                            </li>
                        </ul>

                        {/* The button to trigger the menu */}
                        <button
                            className={`menu-trigger ${isActive ? 'active' : ''}`}
                            onClick={handleClick}
                        >
                            <span>Menu</span>
                        </button>
              
              {/* ***** Menu End ***** */}
            </nav>
          </div>
        </div>
      </div>
    </header>
    {/* ***** Header Area End ***** */}

    <div className="page-heading normal-space">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h6>Pixie NFT Market</h6>
            <h2>Create Your NFT Now.</h2>
            <span>
              Home  <a href="#">Create Yours</a>
            </span>
            <div className="buttons">
              <div className="main-button">
                <a href="/explore">Explore Our Items</a>
              </div>
              <div className="border-button">
                <a href="/create">Create Your NFT</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="item-details-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <div className="line-dec"></div>
              <h2>
                Apply For <em>Your Item</em> Here.
              </h2>
            </div>
          </div>
          <div className="col-lg-12">
            {/* Connect Wallet Button */}
            <button
              onClick={connectWallet}
              className="mb-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              style={{ color: "black", backgroundColor: "black"}}
            >
              {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </button>
            <form id="contact" action="" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="title">Item Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ex. Lyon King"
                      autoComplete="on"
                      required
                    />
                  </fieldset>
                </div>
                
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="description">Description For Item</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Give us your idea"
                      autoComplete="on"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="Categories">Categories</label>
                    {/* ✅ Category Dropdown */}
                    <select name="category" value={formData.category} onChange={handleChange}>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                    </select>
                  </fieldset>
                </div>
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="username">Your Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Ex. @alansmithee"
                      autoComplete="on"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="price">Price Of Item</label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Price depends on quality. Ex. 0.06 ETH"
                      autoComplete="on"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="royalities">Royalties</label>
                    <input
                      type="text"
                      name="royalities"
                      id="royalities"
                      placeholder="Common royalties 1-25%"
                      autoComplete="on"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="file">Your Author Image</label>
                    <input type="file" id="file" name="myfiles[]" multiple onChange={handleAuthorImageChange} />
                    
                  </fieldset>
                </div>
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="file">Your File</label>
                    <input type="file" id="file" name="myfiles[]" multiple onChange={handleFileChange} />
                    
                  </fieldset>
                </div>
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="time">Bidding Time</label>
                    {/* ✅ Bidding Time Inputs */}
                    <input type="number" name="days" placeholder="Days" value={formData.days || ""} onChange={handleChange} />
                    <input type="number" name="hours" placeholder="Hours" value={formData.hours || ""} onChange={handleChange} />
                    <input type="number" name="minutes" placeholder="Minutes" value={formData.minutes || ""} onChange={handleChange} />
                    
                  </fieldset>
                </div>
                <div className="col-lg-8">
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      className="orange-button"
                    >
                      Create NFT
                    </button>
                  </fieldset>
                </div>
                {/* Owned NFTs Section */}
                {ownedNFTs.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mt-6 mb-2" style={{  padding: "5px", color: "white" }}>Your NFTs</h2>
                    {ownedNFTs.map((nft) => (
                      <div key={nft.id} className="mb-4 p-3 border rounded">
                        <h2 style={{  padding: "5px", color: "white" }}>{nft.item_name}</h2>
                        <p style={{ color: "white" }}>{nft.item_description}</p>
                        <p style={{ color: "white" }}>Author: {nft.author} (@{nft.author_wallet})</p>
                        <p style={{ color: "white" }}>Owner: {nft.owner_wallet}</p>
                        <p style={{ color: "white" }}>
                          Current Bid: <strong>{nft.current_bid} ETH</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Transaction History Section */}
                {transactions.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mt-6 mb-2" style={{  padding: "5px", color: "black" }}>Transaction History</h2>
                    {transactions.map((tx) => (
                      <div key={tx.id} className="mb-4 p-3 border rounded">
                        <p style={{ color: "white" }}>
                          <strong>NFT:</strong> {tx.item_name}
                        </p>
                        <p style={{ color: "white" }}>
                          <strong>Bid Amount:</strong> {tx.bid_amount} ETH
                        </p>
                        <p style={{ color: "white" }}>
                          <strong>Bid Time:</strong> {new Date(tx.bid_time).toLocaleString()}
                        </p>
                        <p style={{ color: "white" }}>
                          <strong>Owner Wallet:</strong> {tx.owner_wallet}
                        </p>
                        <p style={{ color: "white" }}>
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
            </form>
          </div>
          <div className="col-lg-12">
            <div className="section-heading">
              <div className="line-dec"></div>
              <h2>
                This Is <em>Your Item</em> Preview.
              </h2>
            </div>
          </div>
          <div className="col-lg-7">
            
              {ipfsUrl && (
              <div className="left-image">
                <p>IPFS URL: <a href={ipfsUrl} target="_blank">{ipfsUrl}</a></p>
                <img src={ipfsUrl} alt="Uploaded NFT" style={{ borderRadius: "20px" }} />
              </div>
            )}
            
          </div>
          <div className="col-lg-5 align-self-center">
            <h4>Item Name</h4>
            <span className="author">
              <img
                src="assets/images/author-02.jpg"
                alt=""
                style={{ maxWidth: "50px", borderRadius: "50%" }}
              />
              <h6>
                Author name<br />
                <a href="#">@author wallet</a>
              </h6>
            </span>
            <p>
              Description: Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="row">
              <div className="col-3">
                <span className="bid">
                  Current Bid<br />
                  <strong>0.06 ETH</strong>
                  <br />
                  <em>($8055,35)</em>
                </span>
              </div>
              <div className="col-4">
                <span className="owner">
                  Owner<br />
                  <strong>Alan Smithee</strong>
                  <br />
                  <em>(@asmithee)</em>
                </span>
              </div>
              <div className="col-5">
                <span className="ends">
                  Ends In<br />
                  <strong>3D 05H 20M 58S</strong>
                  <br />
                  <em>(January 22nd, 2021)</em>
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p>
              Copyright © 2022 <a href="#">Pixie</a> NFT Marketplace Co.,
              Ltd. All rights reserved. &nbsp;&nbsp; Designed by{" "}
              <a
                title="facebook"
                rel="sponsored"
                href="https://www.facebook.com/profile.php?id=100011213104178"
                target="_blank"
              >
                Nguyendinhdung
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
    
  </>
  
  )
}

export default Create
