import React, { useState } from 'react';

function Create() {
  const [isActive, setIsActive] = useState(false);
        const [isMenuVisible, setIsMenuVisible] = useState(false);
    
        const handleClick = () => {
            setIsActive(!isActive); // Toggle the 'active' class
            setIsMenuVisible(!isMenuVisible); // Toggle menu visibility
        };
        const [showWallet, setShowWallet] = useState(false); // Controls the pop-up visibility
        const handleSubmit = (e) => {
          e.preventDefault();
          setShowWallet(true); // Show the wallet pop-up on submit
        };
      
        const handleConfirm = () => {
          alert(`Connection Confirmed `);
          setShowWallet(false); // Close the pop-up
        };
      
        const handleCancel = () => {
          alert('Connection Canceled');
          setShowWallet(false); // Close the pop-up
        };
        const transactionStyle = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderBottom: '1px solid black',
          width: '270px',
          marginLeft: '30px'
        };
      
        const transactionIconStyle = {
          backgroundColor: '#1a4f7c',
          padding: '8px',
          borderRadius: '8px',
          marginRight: '12px',
        };
        const confirmedStyle = {
          color: '#2ecc71',
          fontSize: '14px',
          marginTop: '4px',
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
            <h6>Pixie NFT Market</h6>
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
            <form id="contact" action="" onSubmit={handleSubmit}>
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
                      Submit and connect your wallet
                    </button>
                  </fieldset>
                </div>
                <h4>Your transaction history</h4>
                <div style={transactionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={transactionIconStyle}>↕️</span>
                    <div>
                      <div style={{color: 'white'}}>Buy Asset</div>
                      <div style={confirmedStyle}>Available</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{color: 'orange'}}>bidding 0.02 ETH?</div>
                    <div style={{ color: 'red' }}>$2750.45</div>
                  </div>
                  
                </div>
                <div style={transactionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={transactionIconStyle}>↕️</span>
                    <div>
                      <div style={{color: 'white'}}>Buy Asset</div>
                      <div style={confirmedStyle}>Available</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{color: 'orange'}}>bidding 0.006 ETH?</div>
                    <div style={{ color: 'red' }}>$1040.25</div>
                  </div>
                  
                </div>
                <div style={transactionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={transactionIconStyle}>↕️</span>
                    <div>
                      <div style={{color: 'white'}}>Buy Asset</div>
                      <div style={confirmedStyle}>Available</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{color: 'orange'}}>bidding 0.01 ETH?</div>
                    <div style={{ color: 'red' }}>$3758.64</div>
                  </div>
                  
                </div>
                <div style={transactionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={transactionIconStyle}>↕️</span>
                    <div>
                      <div style={{color: 'white'}}>Buy Asset</div>
                      <div style={confirmedStyle}>Available</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{color: 'orange'}}>bidding 0.0003 ETH?</div>
                    <div style={{ color: 'red' }}>$2008.11</div>
                  </div>
                  
                </div>
                <div style={transactionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={transactionIconStyle}>↕️</span>
                    <div>
                      <div style={{color: 'white'}}>Buy Asset</div>
                      <div style={confirmedStyle}>Available</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{color: 'orange'}}>bidding 0.02 ETH?</div>
                    <div style={{ color: 'red' }}>$2750.45</div>
                  </div>
                  
                </div>
                <div style={transactionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={transactionIconStyle}>↕️</span>
                    <div>
                      <div style={{color: 'white'}}>Buy Asset</div>
                      <div style={confirmedStyle}>Available</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{color: 'orange'}}>bidding 0.0009 ETH?</div>
                    <div style={{ color: 'red' }}>$750.45</div>
                  </div>
                  
                </div>
                <div style={transactionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={transactionIconStyle}>↕️</span>
                    <div>
                      <div style={{color: 'white'}}>Buy Asset</div>
                      <div style={confirmedStyle}>Available</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{color: 'orange'}}>bidding 0.02 ETH?</div>
                    <div style={{ color: 'red' }}>$2750.45</div>
                  </div>
                  
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
              Copyright © 2022 <a href="#">Pixie</a> NFT Marketplace Co.,
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
    {/* Wallet Pop-Up */}
    {showWallet && (
        <WalletPopup
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
  </>
  
  )
}

export default Create
const WalletPopup = ({ bidAmount, balance, onConfirm, onCancel }) => {
  const walletStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1E1E1E', // Darker background to match image
    padding: '24px',
    borderRadius: '16px',
    color: '#fff',
    width: '360px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const balanceStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  const portfolioStyle = {
    color: '#3498db',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  };

  const actionsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px',
    marginBottom: '32px',
  };

  const actionButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  };

  const actionIconStyle = {
    backgroundColor: '#1a4f7c',
    padding: '12px',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const tabsStyle = {
    display: 'flex',
    gap: '24px',
    borderBottom: '1px solid #333',
    marginBottom: '20px',
  };

  const tabStyle = {
    padding: '8px 0',
    color: '#666',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
  };

  const activeTabStyle = {
    ...tabStyle,
    color: '#3498db',
    borderBottom: '2px solid #3498db',
  };

  const transactionStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #333',
  };

  const transactionIconStyle = {
    backgroundColor: '#1a4f7c',
    padding: '8px',
    borderRadius: '8px',
    marginRight: '12px',
  };

  const confirmedStyle = {
    color: '#2ecc71',
    fontSize: '14px',
    marginTop: '4px',
  };
  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };

  const confirmButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#7453fc',
    color: '#fff',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4d4d',
    color: '#fff',
  };
  return (
    <>
      <div style={overlayStyle}></div>
      <div style={walletStyle}>
        <div style={headerStyle}>
          <h3>Account 2</h3>
          <div style={{ color: '#666' }}>0x8626f...C1199</div>
        </div>

        <div style={balanceStyle}>$30.033.00 USD</div>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: '#666' }}>+$5 (+0.03%) </span>
          <a href="#" style={portfolioStyle}>Portfolio ↗</a>
        </div>

        <div style={actionsContainerStyle}>
          <button style={actionButtonStyle}>
            <span style={actionIconStyle}>↕️</span>
            <span>Buy</span>
          </button>
          <button style={actionButtonStyle}>
            <span style={actionIconStyle}>⇄</span>
            <span>Swap</span>
          </button>
          <button style={actionButtonStyle}>
            <span style={actionIconStyle}>⇌</span>
            <span>Sell</span>
          </button>
          <button style={actionButtonStyle}>
            <span style={actionIconStyle}>➚</span>
            <span>Send</span>
          </button>
          <button style={actionButtonStyle}>
            <span style={actionIconStyle}>⊞</span>
            <span>Receive</span>
          </button>
        </div>

        <div style={tabsStyle}>
          <span style={tabStyle}>Tokens</span>
          <span style={tabStyle}>NFTs</span>
          <span style={activeTabStyle}>Activity</span>
        </div>

        <div style={transactionStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={transactionIconStyle}>↕️</span>
            <div>
              <div>Connect</div>
              <div style={confirmedStyle}>Available</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div></div>
            <div style={{ color: '#666' }}></div>
          </div>
          
        </div>
        <button style={cancelButtonStyle} onClick={onCancel}>
            Cancel
          </button>
          <button style={confirmButtonStyle} onClick={onConfirm}>
            Confirm
          </button>
      </div>
    </>
  );
};

