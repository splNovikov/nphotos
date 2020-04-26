import React from 'react';
import { observer } from 'mobx-react';
import Slider from 'react-slick';

import Banner from '../Banner';
import randomNumber from '../../../../utils/randomNumber';

// eslint-disable-next-line no-use-before-define
const banners = getBanners(3);

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

function getBanners(count) {
  const bans = [1, 2, 3, 4, 5].map(value => ({
    mobile: `https://nphotos-images.s3.us-east-2.amazonaws.com/banners/banner-${value}-mobile.jpg`,
    tablet: `https://nphotos-images.s3.us-east-2.amazonaws.com/banners/banner-${value}-computer.jpg`,
    computer: `https://nphotos-images.s3.us-east-2.amazonaws.com/banners/banner-${value}-computer.jpg`
  }));

  const randomNumbers = randomNumber(count, 0, bans.length - 1);

  return randomNumbers.map(num => bans[num]);
}

export default observer(PrefilledBanner);
