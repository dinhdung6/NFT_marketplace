import React, {useState, useEffect} from "react";
import axios from "axios";

const truncateWallet = (wallet) => {
  return wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "";
};
const DiscoverItems = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    const fetchNFTs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/nfts");
        const nfts = response.data.map((nft) => ({
          id: nft.id,
          title: nft.item_name,
          category: nft.category,
          authorImg: nft.author_image,
          authorName: nft.author,
          itemImg: nft.img_url,
          currentBid: `${nft.current_bid} ${nft.currency}`,
          endsIn: new Date(nft.bidding_end_time),
          ownerWallet: truncateWallet(nft.owner_wallet),
          status: getStatus(nft.bidding_end_time),
        }));

        setItems(nfts);
        setFilteredItems(nfts);

        const uniqueCategories = [
          "All",
          ...new Set(nfts.map((nft) => nft.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, []);
  const getStatus = (biddingEndTime) => {
    const now = new Date();
    const endTime = new Date(biddingEndTime);
    const timeDiff = endTime - now;

    if (timeDiff <= 0) return "Closed";
    if (timeDiff <= 24 * 60 * 60 * 1000) return "Ending-Soon";
    return "Available";
  };
  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesKeyword =
        !keyword || item.title.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory =
        category === "All" || item.category === category;
      const matchesStatus = !status || item.status === status;

      return matchesKeyword && matchesCategory && matchesStatus;
    });

    setFilteredItems(filtered);
  }, [keyword, category, status, items]);
  
  

  return (
    
    <div className="discover-items">
      <style>
        {`
          .discover-items {
            position: relative;
            padding: 200px 0px 120px 0px;
            }

            .discover-items {
            content: "";
            background-image: url(../assets/images/dark-bg.jpg);
            background-repeat: no-repeat;
            background-position: center bottom;
            margin-top: 300px;
            background-size: cover;
            position: relative;
            
            left: 0;
            width: 100%;
            height: 100%;
            }


          .discover-items .section-heading {
            text-align: left;
          }

          .discover-items .section-heading .line-dec {
            margin-left: 0;
          }

          .discover-items #search-form {
            margin-top: 15px;
          }

          .discover-items #search-form input,
          .discover-items #search-form select {
            width: 100%;
            height: 46px;
            outline: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 23px;
            background-color: transparent;
            padding: 0px 15px;
            font-size: 14px;
            color: #fff;
          }

          .discover-items #search-form select {
            cursor: pointer;
          }

          .discover-items #search-form select option {
            background-color: #2a2a2a;
          }

          .discover-items #search-form input::placeholder,
          .discover-items #search-form select::placeholder {
            color: #fff;
          }

          .discover-items #search-form button {
            font-size: 14px;
            color: #fff;
            background-color: #7453fc;
            border: 1px solid #7453fc;
            height: 46px;
            line-height: 46px;
            text-align: center;
            width: 100%;
            display: inline-block;
            border-radius: 25px;
            font-weight: 500;
            text-transform: capitalize;
            letter-spacing: 0.5px;
            transition: all .3s;
            position: relative;
            overflow: hidden;
          }

          .discover-items #search-form button:after {
            width: 78%;
            height: 2px;
            background-color: #fff;
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
          }

          .discover-items #search-form button:hover {
            background-color: #fff;
            color: #7453fc;
            border: 1px solid #fff;
          }

          .discover-items .item span.banner {
            font-size: 15px;
            background-color: #7453fc;
            color: #fff;
            font-weight: 500;
            padding: 5px 15px;
            display: inline-block;
            position: absolute;
            border-radius: 16px;
            left: 50%;
            transform: translateX(-50%);
            top: -16px;
          }

          .discover-items .item span.author {
            display: inline-flex;
            width: 100%;
          }

          .discover-items .item span.author img {
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .discover-items .item img {
            margin-top: -32px;
            position: relative;
            z-index: 1;
          }

          .discover-items .item h4 {
            font-size: 20px;
            margin-top: 30px;
          }

          .discover-items .item .line-dec {
            width: 100%;
            height: 1px;
            background-color: rgba(255,255,255,0.2);
            margin: 30px 0px;
          }

          .discover-items .item {
            background-color: #282b2f;
            border: 1px solid #404245;
            padding: 30px;
            border-radius: 20px;
            position: relative;
            margin-bottom: 52px;
          }

          .discover-items .item span {
            color: #fff;
            display: inline-block;
            font-size: 15px;
          }

          .discover-items .item span strong {
            font-size: 20px;
          }

          .discover-items .item span.category {
            text-align: right;
          }

          .discover-items .item .main-button {
            margin-top: 20px;
            margin-bottom: -60px;
            text-align: center;
          }
        `}
      </style>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="section-heading">
              <div className="line-dec"></div>
              <h2>Discover Some Of Our <em>Items</em>.</h2>
            </div> 
          </div>
          <div className="col-lg-7">
            <form id="search-form">
              <div className="row">
                <div className="col-lg-4">
                  <fieldset>
                    <input type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="searchText" placeholder="Type Something..." autoComplete="on" required />
                  </fieldset>
                </div>
                <div className="col-lg-3">
                  <fieldset>
                    <select name="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>
                <div className="col-lg-3">
                  <fieldset>
                    <select name="Price" value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                      <option value="">All Status</option>
                      <option value="Available">Available</option>
                      <option value="Ending-Soon">Ending Soon</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </fieldset>
                </div>
                <div className="col-lg-2">
                  <fieldset>
                    <button className="main-button" type="submit" >Search</button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>

          
  
          <div className="row">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.id} {...item} />
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>

          
        </div>

      </div>
    </div>
  );
};



export default DiscoverItems;

const ItemCard = ({ title, category, currentBid, itemImg, endsIn, status, ownerWallet, authorImg, authorName }) => {
  return (
    <div className="col-lg-3">
      <div className="item">
        <div className="row">
          <div className="col-lg-12">
            <span className="author">
              <img
                src={authorImg} 
                alt={authorName}
                style={{
                  maxWidth: "50px",
                  maxHeight: "50px",
                  borderRadius: "50%",
                }}
              />
            </span>
            <img
              src={itemImg}
              alt={title}
              style={{ borderRadius: "20px" }}
            />
            <h4>{title}</h4>
          </div>
          <div className="col-lg-12">
            <div className="line-dec"></div>
            <div className="row">
              <div className="col-6">
                <span>
                  Current Bid: <br /> <strong>{currentBid}</strong>
                </span>
              </div>
              <div className="col-6">
                <span>
                  Ends In: <br /> <strong>{endsIn.toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main-button">
              <a href="/details">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
