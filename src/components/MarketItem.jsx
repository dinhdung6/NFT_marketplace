import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Isotope from "isotope-layout";

const MarketWrapper = styled.div`
  background-image: url("../images/dark-bg.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  padding: 120px 0px;
  position: relative;
`;

const MarketItem = () => {
  const [activeFilter, setActiveFilter] = useState("*");

  useEffect(() => {
    const gridElement = document.querySelector(".grid");
    const iso = new Isotope(gridElement, {
      itemSelector: ".all",
      layoutMode: "fitRows",
    });

    document.querySelectorAll(".filters ul li").forEach((filterButton) => {
      filterButton.addEventListener("click", () => {
        const filterValue = filterButton.getAttribute("data-filter");
        setActiveFilter(filterValue);
        iso.arrange({ filter: filterValue });
        document
          .querySelectorAll(".filters ul li")
          .forEach((li) => li.classList.remove("active"));
        filterButton.classList.add("active");
      });
    });

    return () => iso.destroy(); // Cleanup Isotope instance on unmount
  }, []);

  const items = [
    {
      id: 1,
      category: "msc",
      image: "assets/images/market-01.jpg",
      title: "Music Art Super Item",
      authorImg: "assets/images/author.jpg",
      authorName: "Liberty Artist",
      authorHandle: "@libertyart",
      bid: "2.03 ETH",
      bidValue: "$8,240.50",
      endsIn: "4D 08H 15M 42S",
      endsDate: "July 24th, 2022",
    },
    {
      id: 2,
      category: "dig",
      image: "assets/images/market-01.jpg",
      title: "Digital Crypto Artwork",
      authorImg: "assets/images/author.jpg",
      authorName: "Liberty Artist",
      authorHandle: "@libertyart",
      bid: "2.03 ETH",
      bidValue: "$7,200.50",
      endsIn: "2D 06H 30M 25S",
      endsDate: "July 26th, 2022",
    },
    {
      id: 3,
      category: "blc",
      image: "assets/images/market-01.jpg",
      title: "Blockchain Item One",
      authorImg: "assets/images/author.jpg",
      authorName: "Liberty Artist",
      authorHandle: "@libertyart",
      bid: "3.64 ETH",
      bidValue: "$6,600.00",
      endsIn: "6D 05H 40M 50S",
      endsDate: "July 28th, 2022",
    },
    {
      id: 4,
      category: "vtr",
      image: "assets/images/market-01.jpg",
      title: "Virtual Currency Art",
      authorImg: "assets/images/author.jpg",
      authorName: "Liberty Artist",
      authorHandle: "@libertyart",
      bid: "2.44 ETH",
      bidValue: "$8,800.50",
      endsIn: "3D 05H 20M 58S",
      endsDate: "July 14th, 2022",
    },
    {
      id: 5,
      category: "vrt dig",
      image: "assets/images/market-01.jpg",
      title: "Digital Art Item",
      authorImg: "assets/images/author.jpg",
      authorName: "Liberty Artist",
      authorHandle: "@libertyart",
      bid: "2.50 ETH",
      bidValue: "$8,400.50",
      endsIn: "4D 08H 32M 18S",
      endsDate: "July 16th, 2022",
    },
    {
      id: 6,
      category: "msc blc",
      image: "assets/images/market-01.jpg",
      title: "Blockchain Music Design",
      authorImg: "assets/images/author.jpg",
      authorName: "Liberty Artist",
      authorHandle: "@libertyart",
      bid: "2.44 ETH",
      bidValue: "$8,200.50",
      endsIn: "5D 10H 22M 24S",
      endsDate: "July 18th, 2022",
    },
  ];

  return (
    <MarketWrapper>
      <div className="currently-market">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h2>
                  <em>Items</em> Currently In The Market.
                </h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="filters">
                <ul>
                  <li data-filter="*" className={activeFilter === "*" ? "active" : ""}>
                    All Items
                  </li>
                  <li data-filter=".msc" className={activeFilter === ".msc" ? "active" : ""}>
                    Music Art
                  </li>
                  <li data-filter=".dig" className={activeFilter === ".dig" ? "active" : ""}>
                    Digital Art
                  </li>
                  <li data-filter=".blc" className={activeFilter === ".blc" ? "active" : ""}>
                    Blockchain
                  </li>
                  <li data-filter=".vtr" className={activeFilter === ".vtr" ? "active" : ""}>
                    Virtual
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row grid">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`col-lg-6 currently-market-item all ${item.category}`}
                  >
                    <div className="item">
                      <div className="left-image">
                        <img
                          src={item.image}
                          alt=""
                          style={{ borderRadius: "20px", minWidth: "195px" }}
                        />
                      </div>
                      <div className="right-content">
                        <h4>{item.title}</h4>
                        <span className="author">
                          <img
                            src={item.authorImg}
                            alt=""
                            style={{ maxWidth: "50px", borderRadius: "50%" }}
                          />
                          <h6>
                            {item.authorName}
                            <br />
                            <a href="#">{item.authorHandle}</a>
                          </h6>
                        </span>
                        <div className="line-dec"></div>
                        <span className="bid">
                          Current Bid
                          <br />
                          <strong>{item.bid}</strong>
                          <br />
                          <em>({item.bidValue})</em>
                        </span>
                        <span className="ends">
                          Ends In
                          <br />
                          <strong>{item.endsIn}</strong>
                          <br />
                          <em>({item.endsDate})</em>
                        </span>
                        <div className="text-button">
                          <a href="/details">View Item Details</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketWrapper>
  );
};

export default MarketItem;
