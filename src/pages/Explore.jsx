import React, { useState } from 'react';
import FeaturedExplore  from '../components/FeatureExplore';
import DiscoverItems from '../components/DiscoverItems';
import TopSellers from '../components/TopSellers';


function Explore() {
  const [isActive, setIsActive] = useState(false);
            const [isMenuVisible, setIsMenuVisible] = useState(false);
        
            const handleClick = () => {
                setIsActive(!isActive); // Toggle the 'active' class
                setIsMenuVisible(!isMenuVisible); // Toggle menu visibility
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
                  <img src="assets/images/pixie.png" alt="" />
                </a>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className={`nav ${isMenuVisible ? 'visible' : ''}`}>
                            <li>
                            <a href="/" >Home</a>
                            </li>
                            <li>
                            <a href="explore"className="active">Explore</a>
                            </li>
                            <li>
                            <a href="details">Item Details</a>
                            </li>
                            <li>
                            <a href="author">Author</a>
                            </li>
                            <li>
                            <a href="create" >Create Yours</a>
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

      <div className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Liberty NFT Market</h6>
              <h2>Discover Some Top Items</h2>
              <span>
                Home  <a href="#">Explore</a>
              </span>
            </div>
          </div>
        </div>
        <FeaturedExplore/>
      </div>

      {/* Discover Items */}
      <DiscoverItems/>
      <TopSellers/>
      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>
                Copyright © 2025 Liberty NFT Market.
                <br />
                Design: <a href="#">Nguyendinhdung</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Explore