import React, { useState } from 'react';

const ItemDetails = () => {
  const [showWallet, setShowWallet] = useState(false); // Controls the pop-up visibility
  const [bidAmount, setBidAmount] = useState(''); // Stores the entered bid amount
  const userBalance = 10.0; // Example ETH balance

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowWallet(true); // Show the wallet pop-up on submit
  };

  const handleConfirm = () => {
    alert(`Transaction Confirmed: ${bidAmount} ETH`);
    setShowWallet(false); // Close the pop-up
  };

  const handleCancel = () => {
    alert('Transaction Canceled');
    setShowWallet(false); // Close the pop-up
  };

  // Inline styles for the page
  const pageStyle = {
    backgroundImage: 'url(../images/dark-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: '120px 0',
    position: 'relative',
  };

  const afterStyle = {
    backgroundImage: 'url(/assets/images/category-collection-dec.png)',
    width: '300px',
    height: '282px',
    position: 'absolute',
    bottom: '0',
    right: '30px',
    content: "''",
    zIndex: 1,
  };

  const imageStyle = {
    borderRadius: '20px',
  };

  const authorImageStyle = {
    maxWidth: '50px',
    borderRadius: '50%',
  };

  const bidStyle = {
    fontSize: '14px',
  };

  const ownerStyle = {
    fontSize: '14px',
  };

  const endsStyle = {
    fontSize: '14px',
  };

  const buttonStyle = {
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#7453fc',
    border: '1px solid #7453fc',
    padding: '12px 30px',
    display: 'inline-block',
    borderRadius: '25px',
    fontWeight: '500',
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
    transition: 'all .3s',
    position: 'relative',
    overflow: 'hidden',
  };

  const buttonHoverStyle = {
    backgroundColor: '#fff',
    color: '#7453fc',
    border: '1px solid #fff',
  };

  return (
    <div className="item-details-page" style={pageStyle}>
      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/item-details-01.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>Dolores Haze Westworld Eye</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/discover-01.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>Mutant Ape Bored</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/discover-02.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>His Other Half</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/discover-03.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>Genesis Meta Boom</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/discover-04.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>Another Half Ape</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/discover-05.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>Pixel Sand Box</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" />
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/discover-06.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>Another Half Ape</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{marginBottom: "50px" }}>
        <div className="col-lg-7">
          <div className="left-image">
            <img
              src="assets/images/discover-02.jpg"
              alt="Item Details"
              style={imageStyle}
            />
          </div>
        </div>
        <div className="col-lg-5 align-self-center">
          <h4>Invisible NFT Land</h4>
          <span className="author">
            <img
              src="assets/images/author-02.jpg"
              alt="Author"
              style={authorImageStyle}
            />
            <h6>
              Pixie Artist<br />
              <a href="#">@Pixieart</a>
            </h6>
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetu dipiscingei elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row">
            <div className="col-3">
              <span className="bid" style={bidStyle}>
                Current Bid<br />
                <strong>6.06 ETH</strong><br />
                <em>($8,025.50)</em>
              </span>
            </div>
            <div className="col-4">
              <span className="owner" style={ownerStyle}>
                Owner<br />
                <strong>David Walker</strong><br />
                <em>(@davidwalker)</em>
              </span>
            </div>
            <div className="col-5">
              <span className="ends" style={endsStyle}>
                Ends In<br />
                <strong>3D 05H 20M 58S</strong><br />
                <em>(January 22nd, 2021)</em>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity-text">Place Bid:</label>
            <input placeholder="1 ETH" className="quantity-text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
            <button
              type="submit"
              id="form-submit"
              className="main-button"
              style={buttonStyle}
              onMouseOver={e => e.target.style = buttonHoverStyle}
              onMouseOut={e => e.target.style = buttonStyle}
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
      {/* Wallet Pop-Up */}
      {showWallet && (
        <WalletPopup
          bidAmount={bidAmount}
          balance={userBalance}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <div style={afterStyle}></div>
    </div>
    


  );
};

export default ItemDetails;



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
              <div>Buy Asset</div>
              <div style={confirmedStyle}>Available</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>bidding {bidAmount} ETH?</div>
            <div style={{ color: '#666' }}>${bidAmount *1270.35} </div>
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

