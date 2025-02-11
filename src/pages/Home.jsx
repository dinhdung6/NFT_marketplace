import React, { useState } from 'react';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import $ from "jquery";
import "owl.carousel";
import BannerCarousel from '../components/BannerCarousel';
import CollectionCarousel from '../components/CollectionCarousel';
import MarketItem from '../components/MarketItem';


function Home() {
    const [isActive, setIsActive] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive); // Toggle the 'active' class
        setIsMenuVisible(!isMenuVisible); // Toggle menu visibility
    };
  return (
    
            <div>
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
                            <a href="/" className="active">Home</a>
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
                        {/* ***** Menu End ***** */}
                    </nav>
                    </div>
                </div>
                </div>
            </header>
            {/* ***** Header Area End ***** */}

            {/* ***** Main Banner Area Start ***** */}
            <div className="main-banner">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                    <div className="header-text">
                        <h6>Pixie NFT Market</h6>
                        <h2>Create, Sell &amp; Collect Top NFT’s.</h2>
                        <p>
                        Pixie NFT Market is a really cool and professional design
                        for your NFT websites. This  is based on
                        Bootstrap v5. 
                        </p>
                        <div className="buttons">
                        <div className="border-button">
                            <a href="/explore">Explore Top NFTs</a>
                        </div>
                        <div className="main-button">
                            <a href="https://youtube.com/" rel="noopener noreferrer" target="_blank">
                            Watch Our Videos
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                    <BannerCarousel/>
                    </div>
                </div>
                </div>
            </div>
            {/* ***** Main Banner Area End ***** */}

            <div className="categories-collections">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="categories">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                            <div className="line-dec"></div>
                            <h2>
                                Browse Through Our <em>Categories</em> Here.
                            </h2>
                            </div>
                        </div>
                        {['Blockchain', 'Digital Art', 'Music Art', 'Virtual World', 'Valuable', 'Triple NFT'].map((category, index) => (
                            <div className="col-lg-2 col-sm-6" key={index}>
                            <div className="item">
                                <div className="icon">
                                <img
                                    src={`assets/images/icon-0${index + 1}.png`}
                                    alt=""
                                />
                                </div>
                                <h4>{category}</h4>
                                <div className="icon-button">
                                <a href="/explore" >
                                    <i className="fa fa-angle-right"></i>
                                </a>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-12">
                    <CollectionCarousel/>
                    </div>
                </div>
                </div>
            </div>

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

            <MarketItem/>
            <footer>
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <p>
                        Copyright © 2022 <a href="#">Pixie</a> NFT Marketplace Co.,
                        Ltd. All rights reserved. &nbsp;&nbsp;Designed by{" "}
                        <a
                        title="facebook"
                        rel="noopener noreferrer"
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
            </div>
        );
        };






export default Home