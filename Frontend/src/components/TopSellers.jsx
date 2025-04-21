import React, { useEffect, useState } from "react";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/top-sellers/");
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      }
    };

    fetchTopSellers();
  }, []);

  return (
    <div>
      <style>
        {`
          .top-seller {
            background-image: url(../assets/images/main-bg.jpg);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            padding: 120px 0px 90px 0px;
            position: relative;
          }

          .top-seller .section-heading .line-dec {
            background-color: #fff;
          }

          .top-seller .item {
            display: flex;
            margin-bottom: 30px;
          }

          .top-seller .item img {
            margin-right: 15px;
          }

          .top-seller .item h4 {
            font-size: 20px;
            margin-top: 12px;
            margin-right: 10px;
          }

          .top-seller .item h6 {
            font-size: 20px;
            font-weight: 700;
            line-height: 25px;
            text-align: left;
          }

          .top-seller .item a {
            font-size: 14px;
            cursor: auto;
            color: #fff;
            font-weight: 400;
            margin-top: 5px;
          }
        `}
      </style>

      <div className="top-seller">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h2>Our Top Sellers This Week.</h2>
              </div>
            </div>

            {sellers.map((seller, index) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item">
                      <h4>{seller.rank}.</h4>
                      <img
                        src={seller.author_image}
                        alt={seller.name}
                        style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%' }}
                      />
                      <h6>
                        {seller.name}
                        <br />
                        <a href="#">NFTs: {seller.nft_count}</a>
                        
                      </h6>
                    </div>
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

export default TopSellers;
