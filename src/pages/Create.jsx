import React, { useState } from 'react';

function Create() {
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
            <h6>Liberty NFT Market</h6>
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
            <form id="contact" action="" method="post">
              <div className="row">
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="title">Item Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
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
                      placeholder="Give us your idea"
                      autoComplete="on"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-4">
                  <fieldset>
                    <label htmlFor="username">Your Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
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
                    <label htmlFor="file">Your File</label>
                    <input type="file" id="file" name="myfiles[]" multiple />
                  </fieldset>
                </div>
                <div className="col-lg-8">
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      className="orange-button"
                    >
                      Submit Your Applying
                    </button>
                  </fieldset>
                </div>
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
            <div className="left-image">
              <img
                src="assets/images/create-yours.jpg"
                alt=""
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <h4>Dolores Haze Westworld Eye</h4>
            <span className="author">
              <img
                src="assets/images/author-02.jpg"
                alt=""
                style={{ maxWidth: "50px", borderRadius: "50%" }}
              />
              <h6>
                Kataleya Smithee<br />
                <a href="#">@kataleey</a>
              </h6>
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do
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
              Copyright © 2022 <a href="#">Liberty</a> NFT Marketplace Co.,
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