import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const FeatureExplore = () => {
  const [nftItems, setNftItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/top-nfts/") // Fetch top NFTs from FastAPI
      .then((response) => setNftItems(response.data))
      .catch((error) => console.error("Error fetching NFTs:", error));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Transition speed in milliseconds
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Duration between slides in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
// Function to truncate wallet address (show first 6 characters)
  const truncateWallet = (wallet) => {
    return wallet ? `${wallet.substring(0, 15)}...` : "N/A";
  };
  

  return (
    <div>
      <style>
        {`
          .featured-explore {
            margin-top: 60px;
            padding-bottom: 60px;
          }

          .featured-explore .slick-slider {
            position: relative;
          }

          .featured-explore .item {
            padding: 10px;
            text-align: center;
          }

          .featured-explore .item .thumb {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            display: inline-block;
            width: 100%;
            max-width: 400px;
            max-height: 380px;
            transition: transform 0.3s ease-in-out;
          }

          .featured-explore .item .thumb:hover {
            transform: scale(1.05);
          }

          .featured-explore .item .thumb img {
            width: 100%;
            border-radius: 20px;
            z-index: +1;
          }

          .featured-explore .item .thumb .hover-effect {
            position: absolute;
            right: -100%;
            bottom: 20px;
            padding: 20px;
            border-radius: 20px;
            background-color: rgba(40, 43, 47, 0.9);
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease-in-out;
          }

          .featured-explore .item .thumb:hover .hover-effect {
            right: 20px;
            visibility: visible;
            opacity: 1;
          }

          .featured-explore .item .hover-effect .content h4 {
            font-size: 20px;
            color: #fff;
            margin-bottom: 10px;
          }

          .featured-explore .item .hover-effect .content span.author {
            display: flex;
            align-items: center;
            color: #fff;
          }

          .featured-explore .item .hover-effect .content span.author img {
            margin-right: 10px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          .featured-explore .item .hover-effect .content span.author h6 {
            margin: 0;
            font-size: 15px;
            line-height: 20px;
          }

          .featured-explore .item .hover-effect .content span.author h6 a {
            color: #7453fc;
            font-weight: 700;
            text-decoration: none;
          }
        `}
      </style>
      <div className="featured-explore">
        <div className="container-fluid">
          <Slider {...settings}>
          {nftItems.map((item) => (
              <div key={item.id} className="item">
                <div className="thumb">
                  <img src={item.img_url} alt={item.item_name} />
                  <div className="hover-effect">
                    <div className="content">
                      <h4>{item.item_name}</h4>
                      <span className="author">
                        <img
                          src={item.author_image} alt={item.author}
                        />
                        <h6>
                          {item.author}
                          <br />
                          <a href="#">{truncateWallet(item.author_wallet)}</a>
                        </h6>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeatureExplore;
