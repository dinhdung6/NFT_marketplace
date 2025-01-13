import React from 'react';

const TopSellers = () => {
  const sellers = [
    { rank: 1, name: 'NFT Top Artist', ethValue: '8.6 ETH', usdValue: '$12,000', img: 'author.jpg' },
    { rank: 2, name: 'George Brandon', ethValue: '4.8 ETH', usdValue: '$14,000', img: 'author-02.jpg' },
    { rank: 3, name: 'Johnny Mayson', ethValue: '6.2 ETH', usdValue: '$26,000', img: 'author-03.jpg' },
    { rank: 4, name: 'Liberty Artist', ethValue: '4.5 ETH', usdValue: '$11,600', img: 'author.jpg' },
    { rank: 5, name: 'Ronald Martino', ethValue: '7.2 ETH', usdValue: '$14,500', img: 'author-02.jpg' },
    { rank: 6, name: 'Anthony Brown', ethValue: '8.6 ETH', usdValue: '$7,400', img: 'author-03.jpg' },
    { rank: 7, name: 'Liberty Artist', ethValue: '9.8 ETH', usdValue: '$14,200', img: 'author.jpg' },
    { rank: 8, name: 'Ronald Martino', ethValue: '6.5 ETH', usdValue: '$15,000', img: 'author-02.jpg' },
    { rank: 9, name: 'David Walker', ethValue: '2.5 ETH', usdValue: '$12,000', img: 'author-03.jpg' },
    { rank: 10, name: 'Liberty Artist', ethValue: '8.8 ETH', usdValue: '$16,800', img: 'author.jpg' },
    { rank: 11, name: 'Anthony Brown', ethValue: '7.5 ETH', usdValue: '$15,400', img: 'author-02.jpg' },
    { rank: 12, name: 'David Walker', ethValue: '5.2 ETH', usdValue: '$12,300', img: 'author-03.jpg' },
  ];

  return (
    <div>
      <style>
        {`
          .top-seller {
            background-image: url(../assets/images/main-bg.jpg);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            padding: 120px 0px 90px 0px;
            position: relative;
          }

          .top-seller .section-heading .line-dec {
            background-color: #fff;
          }

          .top-seller .item {
            display: flex;
            margin-bottom: 30px;
          }

          .top-seller .item img {
            margin-right: 15px;
          }

          .top-seller .item h4 {
            font-size: 20px;
            margin-top: 12px;
            margin-right: 10px;
          }

          .top-seller .item h6 {
            font-size: 20px;
            font-weight: 700;
            line-height: 25px;
            text-align: left;
          }

          .top-seller .item a {
            font-size: 14px;
            cursor: auto;
            color: #fff;
            font-weight: 400;
            margin-top: 5px;
          }
        `}
      </style>

      <div className="top-seller">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h2>Our Top Sellers This Week.</h2>
              </div>
            </div>

            {sellers.map((seller, index) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item">
                      <h4>{seller.rank}.</h4>
                      <img
                        src={`assets/images/${seller.img}`}
                        alt={seller.name}
                        style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%' }}
                      />
                      <h6>
                        {seller.name}
                        <br />
                        <a href="#">{seller.ethValue} or {seller.usdValue}</a>
                      </h6>
                    </div>
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

export default TopSellers;
