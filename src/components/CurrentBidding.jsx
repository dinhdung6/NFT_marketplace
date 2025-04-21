import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrentBidding = () => {
  const containerStyle = {
    backgroundImage: 'url(../images/dark-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: '120px 0px 120px 0px',
    position: 'relative',
  };

  const miniHeadingStyle = {
    backgroundColor: '#7453fc',
    display: 'inline-block',
    fontSize: '20px',
    padding: '10px 20px',
    borderRadius: '22px',
  };

  const selectStyle = {
    float: 'right',
    width: '150px',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '500',
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  };

  const itemStyle = {
    position: 'relative',
    zIndex: 2,
    marginTop: '30px',
    display: 'flex',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#282b2f',
    border: '1px solid #404245',
  };

  const rightContentStyle = {
    padding: '30px',
    width: '100%',
  };

  const rightContentH4Style = {
    fontSize: '20px',
    marginBottom: '0px',
  };

  const rightContentLinkStyle = {
    fontSize: '15px',
    color: '#7453fc',
    fontWeight: '700',
  };

  const lineDecStyle = {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '25px 0px',
  };

  const rightContentH6Style = {
    fontSize: '15px',
    fontWeight: '400',
    marginBottom: '8px',
  };

  const rightContentH6EmStyle = {
    fontSize: '18px',
    color: '#7453fc',
    fontStyle: 'normal',
    fontWeight: '700',
  };
  const leftImgStyle = {
    flexBasis: '80%',
    display: 'inline-flex',
  };

  const dateStyle = {
    fontSize: '15px',
    color: '#7453fc',
  };

  // State for items and sorting
  const [sortOrder, setSortOrder] = useState("latest");
  const [items, setItems] = useState([]);
  const [nftImages, setNftImages] = useState({}); // 👈 Store NFT images

  // Fetch transactions from FastAPI
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/transactions");
        setItems(response.data);

        // Fetch NFT images for each transaction
        const nftData = {};
        await Promise.all(
          response.data.map(async (item) => {
            try {
              const nftResponse = await axios.get(`http://127.0.0.1:8000/nfts/${item.item_id}`);
              nftData[item.item_id] = nftResponse.data.img_url;
            } catch (error) {
              console.error("Error fetching NFT data:", error);
              nftData[item.item_id] = "assets/images/placeholder.png"; // Fallback image
            }
          })
        );

        setNftImages(nftData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchBids();
  }, []);

  // Sorting function
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.bid_time) - new Date(a.bid_time);
    } else if (sortOrder === "old") {
      return new Date(a.bid_time) - new Date(b.bid_time);
    } else if (sortOrder === "low") {
      return parseFloat(a.bid_amount) - parseFloat(b.bid_amount);
    } else if (sortOrder === "high") {
      return parseFloat(b.bid_amount) - parseFloat(a.bid_amount);
    }
    return 0;
  });

  return (
    <div className="col-lg-12" style={containerStyle}>
      <div className="current-bid">
        <div className="row">
          <div className="col-lg-6">
            <div className="mini-heading" style={miniHeadingStyle}>
              <h4 style={{marginBottom: 0}}>Current Biddings Prices ( ETH )</h4>
            </div>
          </div>
          <div className="col-lg-6">
            <fieldset>
              <select
                className="form-select"
                aria-label="Default select example"
                style={selectStyle}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}

              >
                <option value="latest" style={{color: 'black'}}>Sort By: Latest</option>
                <option value="old" style={{color: 'black'}}>Sort By: Oldest</option>
                <option value="low" style={{color: 'black'}}>Sort By: Lowest</option>
                <option value="high" style={{color: 'black'}}>Sort By: Highest</option>
              </select>
            </fieldset>
          </div>
          <div className="row">
            {sortedItems.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <div className="item" style={itemStyle}>
                  <div className="left-img" style={leftImgStyle}>
                  
                      <img 
                        src={nftImages[item.item_id]}
                        alt={`NFT ${item.item_name}`} 

                        style={leftImgStyle}
                      />
                    
                  </div>
                  <div className="right-content" style={rightContentStyle}>
                    <h4 style={rightContentH4Style}>{item.item_name}</h4>
                    <a href="#" style={rightContentLinkStyle}>
                      {item.owner_wallet.slice(0, 6)}...{item.owner_wallet.slice(-4)}
                      <br /> {/* 👈 Forces the address onto a new line if needed */}
                    </a>
                    <div className="line-dec" style={lineDecStyle}></div>
                    <h6 style={rightContentH6Style}>Bid: <em style={rightContentH6EmStyle}>{item.bid_amount} ETH</em></h6>
                    <span className="date" style={dateStyle}>{new Date(item.bid_time).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBidding;
