import React from "react";


const DiscoverItems = () => {
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
            <form id="search-form" name="gs" method="submit" role="search" action="#">
              <div className="row">
                <div className="col-lg-4">
                  <fieldset>
                    <input type="text" name="keyword" className="searchText" placeholder="Type Something..." autoComplete="on" required />
                  </fieldset>
                </div>
                <div className="col-lg-3">
                  <fieldset>
                    <select name="Category" className="form-select">
                      <option selected>All Categories</option>
                      <option value="Music">Music</option>
                      <option value="Digital">Digital</option>
                      <option value="Blockchain">Blockchain</option>
                      <option value="Virtual">Virtual</option>
                    </select>
                  </fieldset>
                </div>
                <div className="col-lg-3">
                  <fieldset>
                    <select name="Price" className="form-select">
                      <option selected>Available</option>
                      <option value="Ending-Soon">Ending Soon</option>
                      <option value="Coming-Soon">Coming Soon</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </fieldset>
                </div>
                <div className="col-lg-2">
                  <fieldset>
                    <button className="main-button">Search</button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>

          {/* Single Items */}
          <div className="col-lg-6">
            <div className="item">
                <div className="row">
                <div className="col-lg-12">
                    <span className="banner">Double Item</span>
                </div>
                <div className="col-lg-6 col-sm-6">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-01.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>Mutant Ape Bored</h4>
                </div>
                <div className="col-lg-6 col-sm-6">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-02.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>His Other Half</h4>
                </div>
                <div className="col-lg-12">
                    <div className="line-dec"></div>
                    <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <span>
                        Current Bid: <br /> <strong>8.16 ETH</strong>
                        </span>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <span>
                        Category: <br /> <strong>Digital Art</strong>
                        </span>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <span>
                        Collection: <br /> <strong>2/2</strong>
                        </span>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <span>
                        Ends In: <br /> <strong>25th Nov</strong>
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
            <div className="col-lg-3">
            <div className="item">
                <div className="row">
                <div className="col-lg-12">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-03.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>Genesis Meta Boom</h4>
                </div>
                <div className="col-lg-12">
                    <div className="line-dec"></div>
                    <div className="row">
                    <div className="col-6">
                        <span>
                        Current Bid: <br /> <strong>5.15 ETH</strong>
                        </span>
                    </div>
                    <div className="col-6">
                        <span>
                        Ends In: <br /> <strong>26th Nov</strong>
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
            <div className="col-lg-3">
            <div className="item">
                <div className="row">
                <div className="col-lg-12">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-04.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>Another Half Ape</h4>
                </div>
                <div className="col-lg-12">
                    <div className="line-dec"></div>
                    <div className="row">
                    <div className="col-6">
                        <span>
                        Current Bid: <br /> <strong>3.63 ETH</strong>
                        </span>
                    </div>
                    <div className="col-6">
                        <span>
                        Ends In: <br /> <strong>24th Nov</strong>
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
            <div className="col-lg-3">
            <div className="item">
                <div className="row">
                <div className="col-lg-12">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-03.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>Pixel Sand Box</h4>
                </div>
                <div className="col-lg-12">
                    <div className="line-dec"></div>
                    <div className="row">
                    <div className="col-6">
                        <span>
                        Current Bid: <br /> <strong>4.68 ETH</strong>
                        </span>
                    </div>
                    <div className="col-6">
                        <span>
                        Ends In: <br /> <strong>28th Nov</strong>
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
            <div className="col-lg-3">
            <div className="item">
                <div className="row">
                <div className="col-lg-12">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-04.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>Another Half Ape</h4>
                </div>
                <div className="col-lg-12">
                    <div className="line-dec"></div>
                    <div className="row">
                    <div className="col-6">
                        <span>
                        Current Bid: <br /> <strong>2.03 ETH</strong>
                        </span>
                    </div>
                    <div className="col-6">
                        <span>
                        Ends In: <br /> <strong>25th Nov</strong>
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
            <div className="col-lg-3">
            <div className="item">
                <div className="row">
                <div className="col-lg-12">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-06.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>Invisible NFT Land</h4>
                </div>
                <div className="col-lg-12">
                    <div className="line-dec"></div>
                    <div className="row">
                    <div className="col-6">
                        <span>
                        Current Bid: <br /> <strong>2.03 ETH</strong>
                        </span>
                    </div>
                    <div className="col-6">
                        <span>
                        Ends In: <br /> <strong>25th Nov</strong>
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
            <div className="col-lg-3">
            <div className="item">
                <div className="row">
                <div className="col-lg-12">
                    <span className="author">
                    <img
                        src="assets/images/author.jpg"
                        alt=""
                        style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        borderRadius: "50%",
                        }}
                    />
                    </span>
                    <img
                    src="assets/images/discover-05.jpg"
                    alt=""
                    style={{ borderRadius: "20px" }}
                    />
                    <h4>Another Half Ape</h4>
                </div>
                <div className="col-lg-12">
                    <div className="line-dec"></div>
                    <div className="row">
                    <div className="col-6">
                        <span>
                        Current Bid: <br /> <strong>2.64 ETH</strong>
                        </span>
                    </div>
                    <div className="col-6">
                        <span>
                        Ends In: <br /> <strong>25th Nov</strong>
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


          {/* Additional Items */}
          {/* Add additional items in the same structure here */}
        </div>
      </div>
    </div>
  );
};

export default DiscoverItems;
