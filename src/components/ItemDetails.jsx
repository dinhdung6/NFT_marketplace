import React from 'react';

const ItemDetails = () => {
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
      <div className="row">
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
              Liberty Artist<br />
              <a href="#">@libertyart</a>
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
          <form action="submit">
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
      <div style={afterStyle}></div>
    </div>
  );
};

export default ItemDetails;
