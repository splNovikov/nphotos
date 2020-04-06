import React from 'react';
import { observer } from 'mobx-react';
import Slider from 'react-slick';

import Banner from '../Banner';

const banners = [
  {
    mobile:
      'https://nphotos-images.s3.us-east-2.amazonaws.com/banner-1-mobile.png',
    tablet:
      'https://nphotos-images.s3.us-east-2.amazonaws.com/banner-1-computer.png',
    computer:
      'https://nphotos-images.s3.us-east-2.amazonaws.com/banner-1-computer.png'
  },
  {
    mobile:
      'https://nphotos-images.s3.us-east-2.amazonaws.com/banner-2-mobile.jpg',
    tablet:
      'https://nphotos-images.s3.us-east-2.amazonaws.com/banner-2-computer.jpg',
    computer:
      'https://nphotos-images.s3.us-east-2.amazonaws.com/banner-2-computer.jpg'
  }
];

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
    {banners.map(banner => (
      <Banner
        key={banner.mobile}
        h1={banner.h1}
        h2={banner.h2}
        bgMobile={banner.mobile}
        bgTablet={banner.tablet}
        bgDesktop={banner.computer}
      />
    ))}
  </Slider>
);

export default observer(PrefilledBanner);
