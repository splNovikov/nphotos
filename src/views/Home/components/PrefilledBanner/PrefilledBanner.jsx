import React from 'react';
import { observer } from 'mobx-react';
import Slider from 'react-slick';

import Banner from '../Banner';
import randomNumber from '../../../../utils/randomNumber';

const bannersPath = process.env.BANNERS_PATH;
// eslint-disable-next-line no-use-before-define
const banners = getBanners(3);

const PrefilledBanner = () => (
  <Slider
    accessibility={false}
    arrows={false}
    autoplay
    autoplaySpeed={7500}
    draggable
    infinite
    mobileFirst
    pauseOnFocus={false}
    pauseOnHover={false}
    speed={750}
    slidesToShow={1}
    slidesToScroll={1}
    swipe
    touchMove
    lazyLoad
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
    mobile: `${bannersPath}/banner-${value}-mobile.jpg`,
    tablet: `${bannersPath}/banner-${value}-computer.jpg`,
    computer: `${bannersPath}/banner-${value}-computer.jpg`
  }));

  const randomNumbers = randomNumber(count, 0, bans.length - 1);

  return randomNumbers.map(num => bans[num]);
}

export default observer(PrefilledBanner);
