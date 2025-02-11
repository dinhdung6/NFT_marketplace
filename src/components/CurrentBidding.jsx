import React, { useState } from 'react';

const CurrentBidding = () => {
  const containerStyle = {
    backgroundImage: 'url(../images/dark-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: '120px 0px 120px 0px',
    position: 'relative',
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

  // State for items and sorting
  const [sortOrder, setSortOrder] = useState('latest');
  const [items, setItems] = useState([
    { id: 1, img: 'current-01.jpg', name: 'David Walker', username: '@davidwalker', bid: 0.02, date: '2021-07-24T22:00:00' },
    { id: 2, img: 'current-02.jpg', name: 'David Walker', username: '@davidwalker', bid: 0.03, date: '2022-07-24T22:00:00' },
    { id: 3, img: 'current-03.jpg', name: 'David Walker', username: '@davidwalker', bid: 0.04, date: '2023-07-24T22:00:00' },
    { id: 4, img: 'current-02.jpg', name: 'David Walker', username: '@davidwalker', bid: 0.05, date: '2024-07-24T22:00:00' },
    { id: 5, img: 'current-04.jpg', name: 'David Walker', username: '@davidwalker', bid: 0.06, date: '2025-07-24T22:00:00' },
    { id: 6, img: 'current-01.jpg', name: 'David Walker', username: '@davidwalker', bid: 0.07, date: '2022-08-24T22:00:00' },
  ]);

  // Sort items based on the selected sort order
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.date) - new Date(a.date); // Latest first
    } else if (sortOrder === 'old') {
      return new Date(a.date) - new Date(b.date); // Oldest first
    } else if (sortOrder === 'low') {
      return a.bid - b.bid; // Lowest bid first
    } else if (sortOrder === 'high') {
      return b.bid - a.bid; // Highest bid first
    }
    return 0;
  });

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="col-lg-12" style={containerStyle}>
      <div className="current-bid">
        <div className="row">
          <div className="col-lg-6">
            <div className="mini-heading" style={miniHeadingStyle}>
              <h4 style={{marginBottom: 0}}>Current Biddings Prices ( ETH )</h4>
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
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="latest" style={{color: 'black'}}>Sort By: Latest</option>
                <option value="old" style={{color: 'black'}}>Sort By: Oldest</option>
                <option value="low" style={{color: 'black'}}>Sort By: Lowest</option>
                <option value="high" style={{color: 'black'}}>Sort By: Highest</option>
              </select>
            </fieldset>
          </div>
          <div className="row">
            {sortedItems.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <div className="item" style={itemStyle}>
                  <div className="left-img">
                    <img src={`assets/images/${item.img}`} alt={`Bid Item ${item.id}`} />
                  </div>
                  <div className="right-content" style={rightContentStyle}>
                    <h4 style={rightContentH4Style}>{item.name}</h4>
                    <a href="#" style={rightContentLinkStyle}>{item.username}</a>
                    <div className="line-dec" style={lineDecStyle}></div>
                    <h6 style={rightContentH6Style}>Bid: <em style={rightContentH6EmStyle}>{item.bid} ETH</em></h6>
                    <span className="date" style={dateStyle}>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBidding;
