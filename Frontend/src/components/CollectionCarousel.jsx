import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CollectionCarousel = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/nft-collections")  // FastAPI backend URL
      .then((response) => response.json())
      .then((data) => setCollections(data))
      .catch((error) => console.error("Error fetching NFT collections:", error));
  }, []);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className=""
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="w-full px-4 py-12">
      <style>
        {`
          .collections {
            margin-top: 140px;
          }

          .collections .item img {
            border-top-right-radius: 20px;
            border-top-left-radius: 20px;
            max-height: 300px;
          }

          .collections .item .down-content {
            background-color: #282b2f;
            border: 1px solid #404245;
            border-bottom-right-radius: 20px;
            border-bottom-left-radius: 20px;
            padding: 30px;
          }

          .collections .item .down-content h4 {
            font-size: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            margin-bottom: 20px;
            padding-bottom: 20px;
          }

          .collections .item {
            padding-bottom: 60px;
          }

          .collections .item span {
            color: #fff;
            display: inline-block;
            width: 48%;
            font-size: 15px;
          }

          .collections .item span strong {
            font-size: 20px;
          }

          .collections .item span.category {
            text-align: right;
          }

          .collections .item .main-button a {
            width: 100%;
            text-align: center;
          }

          .collections .item .main-button {
            margin-top: 20px;
            margin-bottom: -60px;
          }

          .collections .item .main-button a:hover {
            background-color: #fff;
            border: 1px solid #fff;
            color: #7453fc;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="h-1 w-16 bg-purple-600 mb-4"></div>
          <h2 className="text-3xl font-bold">
            Explore Some Hot <span className="text-purple-600">Collections</span> In Market.
          </h2>
        </div>
        
        <div className="collections relative px-12">
          <Slider {...settings}>
            {collections.map((collection, index) => (
              <div key={index} className="item p-4">
                <div className="">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="down-content">
                    <h4>{collection.title}</h4>
                    <span>
                      Items In Collection:<br />
                      <strong>{collection.items}</strong>
                    </span>
                    <span className="category">
                      Category:<br />
                      <strong>{collection.category}</strong>
                    </span>
                    <div className="main-button">
                      <a href={collection.exploreLink}>
                        {collection.buttonText}
                      </a>
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

export default CollectionCarousel;
