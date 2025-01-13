import React, { useState } from 'react';

function Author() {
  const [isActive, setIsActive] = useState(false);
      const [isMenuVisible, setIsMenuVisible] = useState(false);
  
      const handleClick = () => {
          setIsActive(!isActive); // Toggle the 'active' class
          setIsMenuVisible(!isMenuVisible); // Toggle menu visibility
      };
  return (
      <div>
        {/* Preloader */}
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

        {/* Header Area */}
        <header className="header-area header-sticky">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="main-nav">
                  {/* Logo */}
                  <a href="/" className="logo">
                    <img src="assets/images/pixie.png" alt="" />
                  </a>

                  {/* Menu */}
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
                            <a href="/author" className="active">Author</a>
                            </li>
                            <li>
                            <a href="/create">Create Yours</a>
                            </li>
                        </ul>

                        {/* The button to trigger the menu */}
                        <button
                            className={`menu-trigger ${isActive ? 'active' : ''}`}
                            onClick={handleClick}
                        >
                            <span>Menu</span>
                        </button>
                </nav>
              </div>
            </div>
          </div>
        </header>

        {/* Page Heading */}
        <div className="page-heading normal-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h6>Author Details</h6>
                <h2>View Details For Author</h2>
                <span>Home <a href="#">Author</a></span>
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

        {/* Author Details */}
        <div className="author-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="author">
                  <img src="assets/images/single-author.jpg" alt="" style={{ borderRadius: '50%', maxWidth: '170px' }} />
                  <h4>Melanie Smith <br /> <a href="#">@melanie32</a></h4>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-info">
                  <div className="row">
                    <div className="col-4">
                      <div className="info-item">
                        <i className="fa fa-heart"></i>
                        <h6>1238 <em>Likes</em></h6>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="info-item">
                        <i className="fa fa-hand"></i>
                        <h6>1238 <em>Likes</em></h6>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="info-item">
                        <i className="fa fa-dollar"></i>
                        <h6>1238 <em>Likes</em></h6>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <h5>559 Followers</h5>
                    </div>
                    <div className="col-7">
                      <div className="main-button">
                        <a href="#">Follow @melanie32</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author's Items Section */}
              <div className="col-lg-12">
                <div className="section-heading">
                  <div className="line-dec"></div>
                  <h2>Melanie Smith’s <em>Items</em>.</h2>
                </div>
              </div>
              {/* Item Cards */}
              <div className="col-lg-3 col-md-6">
                <div className="item">
                  <div className="row">
                    <div className="col-lg-12">
                      <span className="author">
                        <img src="assets/images/author.jpg" alt="" style={{ maxWidth: '50px', borderRadius: '50%' }} />
                      </span>
                      <img src="assets/images/discover-03.jpg" alt="" style={{ borderRadius: '20px' }} />
                      <h4>Mutant Ape Bored</h4>
                    </div>
                    <div className="col-lg-12">
                      <div className="line-dec"></div>
                      <div className="row">
                        <div className="col-6">
                          <span>Current Bid: <br /> <strong>2.03 ETH</strong></span>
                        </div>
                        <div className="col-6">
                          <span>Ends In: <br /> <strong>25th Nov</strong></span>
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
              <div className="col-lg-3 col-md-6">
                <div className="item">
                  <div className="row">
                    <div className="col-lg-12">
                      <span className="author">
                        <img src="assets/images/author-02.jpg" alt="" style={{ maxWidth: "50px", borderRadius: "50%" }} />
                      </span>
                      <img src="assets/images/discover-06.jpg" alt="" style={{ borderRadius: "20px" }} />
                      <h4>Mutant Ape Bored</h4>
                    </div>
                    <div className="col-lg-12">
                      <div className="line-dec"></div>
                      <div className="row">
                        <div className="col-6">
                          <span>Current Bid: <br /> <strong>2.03 ETH</strong></span>
                        </div>
                        <div className="col-6">
                          <span>Ends In: <br /> <strong>25th Nov</strong></span>
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
              <div className="col-lg-3 col-md-6">
                <div className="item">
                  <div className="row">
                    <div className="col-lg-12">
                      <span className="author">
                        <img src="assets/images/author.jpg" alt="" style={{ maxWidth: "50px", borderRadius: "50%" }} />
                      </span>
                      <img src="assets/images/discover-05.jpg" alt="" style={{ borderRadius: "20px" }} />
                      <h4>Mutant Ape Bored</h4>
                    </div>
                    <div className="col-lg-12">
                      <div className="line-dec"></div>
                      <div className="row">
                        <div className="col-6">
                          <span>Current Bid: <br /> <strong>2.03 ETH</strong></span>
                        </div>
                        <div className="col-6">
                          <span>Ends In: <br /> <strong>25th Nov</strong></span>
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
              <div className="col-lg-3 col-md-6">
                <div className="item">
                  <div className="row">
                    <div className="col-lg-12">
                      <span className="author">
                        <img src="assets/images/author-03.jpg" alt="" style={{ maxWidth: "50px", borderRadius: "50%" }} />
                      </span>
                      <img src="assets/images/discover-04.jpg" alt="" style={{ borderRadius: "20px" }} />
                      <h4>Mutant Ape Bored</h4>
                    </div>
                    <div className="col-lg-12">
                      <div className="line-dec"></div>
                      <div className="row">
                        <div className="col-6">
                          <span>Current Bid: <br /> <strong>2.03 ETH</strong></span>
                        </div>
                        <div className="col-6">
                          <span>Ends In: <br /> <strong>25th Nov</strong></span>
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
  
              {/* Repeat similar items here */}
            </div>
          </div>
        </div>

        {/* Create NFT Section */}
        <div className="create-nft">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="section-heading">
                  <div className="line-dec"></div>
                  <h2>Create Your NFT & Put It On The Market.</h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="main-button">
                  <a href="/create">Create Your NFT Now</a>
                </div>
              </div>
              {/* Steps for NFT creation */}
              <div className="col-lg-4">
                <div className="item first-item">
                  <div className="number">
                    <h6>1</h6>
                  </div>
                  <div className="icon">
                    <img src="assets/images/icon-02.png" alt="" />
                  </div>
                  <h4>Set Up Your Wallet</h4>
                  <p>Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="item second-item">
                  <div className="number">
                    <h6>2</h6>
                  </div>
                  <div className="icon">
                    <img src="assets/images/icon-04.png" alt="" />
                  </div>
                  <h4>Add Your Digital NFT</h4>
                  <p>Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="item">
                  <div className="icon">
                    <img src="assets/images/icon-06.png" alt="" />
                  </div>
                  <h4>Sell Your NFT &amp; Make Profit</h4>
                  <p>Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>

              {/* Repeat steps for second and third items */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>
                  Copyright © 2022 <a href="#">Liberty</a> NFT Marketplace Co., Ltd. All rights reserved.
                  &nbsp;&nbsp;
                  Designed by <a title="facebook" rel="sponsored" href="https://www.facebook.com/profile.php?id=100011213104178" target="_blank">Nguyendinhdung</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

export default Author