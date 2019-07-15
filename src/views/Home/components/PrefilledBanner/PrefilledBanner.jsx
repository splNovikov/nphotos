import React from 'react';
import Slider from 'react-slick';

import banners from '../../../../assets/images/banners-bg';
import Banner from '../Banner';

const PrefilledBanner = () => (
  <Slider
    accessibility={false}
    arrows={false}
    autoplay
    autoplaySpeed={15000}
    draggable
    infinite
    mobileFirst
    pauseOnFocus={false}
    pauseInHover={false}
    speed={1500}
    slidesToShow={1}
    slidesToScroll={1}
    swipe
    touchMove
  >
    <Banner
      h1="Сайт"
      h2="в разработке"
      bgMobile={banners.bg1mobile}
      bgTablet={banners.bg1tablet}
      bgDesktop={banners.bg1computer}
    />
    <Banner
      h1="Сайт"
      h2="в разработке, тоже"
      bgMobile={banners.bg2mobile}
      bgTablet={banners.bg2tablet}
      bgDesktop={banners.bg2computer}
    />
  </Slider>
);

export default PrefilledBanner;
