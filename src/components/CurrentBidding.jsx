import React from 'react';

const CurrentBidding = () => {
  const containerStyle = {
    backgroundImage: 'url(../images/dark-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: '120px 0px 120px 0px',
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

  const miniHeadingStyle = {
    backgroundColor: '#7453fc',
    display: 'inline-block',
    fontSize: '20px',
    padding: '10px 20px',
    borderRadius: '22px',
  };

  const selectStyle = {
    float: 'right',
    width: '150px',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '500',
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  };

  const itemStyle = {
    position: 'relative',
    zIndex: 2,
    marginTop: '30px',
    display: 'flex',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#282b2f',
    border: '1px solid #404245',
  };

  const leftImgStyle = {
    flexBasis: '80%',
    display: 'inline-flex',
  };

  const rightContentStyle = {
    padding: '30px',
    width: '100%',
  };

  const rightContentH4Style = {
    fontSize: '20px',
    marginBottom: '0px',
  };

  const rightContentLinkStyle = {
    fontSize: '15px',
    color: '#7453fc',
    fontWeight: '700',
  };

  const lineDecStyle = {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '25px 0px',
  };

  const rightContentH6Style = {
    fontSize: '15px',
    fontWeight: '400',
    marginBottom: '8px',
  };

  const rightContentH6EmStyle = {
    fontSize: '18px',
    color: '#7453fc',
    fontStyle: 'normal',
    fontWeight: '700',
  };

  const dateStyle = {
    fontSize: '15px',
    color: '#7453fc',
  };

  return (
    <div className="col-lg-12" style={containerStyle}>
      <div className="current-bid">
        <div className="row">
          <div className="col-lg-6">
            <div className="mini-heading" style={miniHeadingStyle}>
              <h4>Current Biddings Prices ( ETH )</h4>
            </div>
          </div>
          <div className="col-lg-6">
            <fieldset>
              <select
                name="Category"
                className="form-select"
                aria-label="Default select example"
                id="chooseCategory"
                style={selectStyle}
              >
                <option defaultValue>Sort By: Latest</option>
                <option value="old">Sort By: Oldest</option>
                <option value="low">Sort By: Lowest</option>
                <option value="high">Sort By: Highest</option>
              </select>
            </fieldset>
          </div>
          <div className="row">
            {/* Static Bidding Items */}
            {[
              { id: 1, img: 'current-01.jpg', name: 'David Walker', username: '@davidwalker', bid: '0.06 ETH', date: '24/07/2022, 22:00' },
              { id: 2, img: 'current-02.jpg', name: 'David Walker', username: '@davidwalker', bid: '0.06 ETH', date: '24/07/2022, 22:00' },
              { id: 3, img: 'current-03.jpg', name: 'David Walker', username: '@davidwalker', bid: '0.06 ETH', date: '24/07/2022, 22:00' },
              { id: 4, img: 'current-02.jpg', name: 'David Walker', username: '@davidwalker', bid: '0.06 ETH', date: '24/07/2022, 22:00' },
              { id: 5, img: 'current-04.jpg', name: 'David Walker', username: '@davidwalker', bid: '0.06 ETH', date: '24/07/2022, 22:00' },
              { id: 6, img: 'current-01.jpg', name: 'David Walker', username: '@davidwalker', bid: '0.06 ETH', date: '24/07/2022, 22:00' },
            ].map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="item" style={itemStyle}>
                  <div className="left-img" style={leftImgStyle}>
                    <img src={`assets/images/${item.img}`} alt={`Bid Item ${item.id}`} />
                  </div>
                  <div className="right-content" style={rightContentStyle}>
                    <h4 style={rightContentH4Style}>{item.name}</h4>
                    <a href="#" style={rightContentLinkStyle}>{item.username}</a>
                    <div className="line-dec" style={lineDecStyle}></div>
                    <h6 style={rightContentH6Style}>Bid: <em style={rightContentH6EmStyle}>{item.bid}</em></h6>
                    <span className="date" style={dateStyle}>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Repeated Bidding Items */}
          {[...Array(6)].map((_, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="item" style={itemStyle}>
                <div className="left-img" style={leftImgStyle}>
                  <img src={`assets/images/current-0${(index % 4) + 1}.jpg`} alt={`Bid Item ${index + 7}`} />
                </div>
                <div className="right-content" style={rightContentStyle}>
                  <h4 style={rightContentH4Style}>David Walker</h4>
                  <a href="#" style={rightContentLinkStyle}>@davidwalker</a>
                  <div className="line-dec" style={lineDecStyle}></div>
                  <h6 style={rightContentH6Style}>Bid: <em style={rightContentH6EmStyle}>0.06 ETH</em></h6>
                  <span className="date" style={dateStyle}>24/07/2022, 22:00</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentBidding;
