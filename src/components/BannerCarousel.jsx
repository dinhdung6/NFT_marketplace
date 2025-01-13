import React from "react";
import Slider from "react-slick"; // Import React Slick component

const BannerCarousel = () => {
  // Slider settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show 1 slide at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set the autoplay speed (in ms)
  };

  return (
    <div className="owl-banner">
      <Slider {...settings}>
        <div className="item">
          <img src="assets/images/banner-01.png" alt="Banner 1" />
        </div>
        <div className="item">
          <img src="assets/images/banner-02.png" alt="Banner 2" />
        </div>
      </Slider>
    </div>
  );
};

export default BannerCarousel;
