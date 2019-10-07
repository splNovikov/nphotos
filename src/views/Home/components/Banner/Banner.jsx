import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Responsive, Image } from 'semantic-ui-react';

import './Banner.scss';

const Banner = ({ h1, h2, bgMobile, bgTablet, bgDesktop }) => (
  <div className="banner">
    <Responsive {...Responsive.onlyMobile}>
      <Image src={bgMobile} fluid />
      <div className="banner-text">
        <h1>{h1}</h1>
        <h3>{h2}</h3>
      </div>
    </Responsive>
    <Responsive {...Responsive.onlyTablet}>
      <Image src={bgTablet} fluid />
      <div className="banner-text">
        <h1>{h1}</h1>
        <h3>{h2}</h3>
      </div>
    </Responsive>
    <Responsive {...Responsive.onlyComputer}>
      <Image src={bgDesktop} fluid />
      <div className="banner-text">
        <h1>{h1}</h1>
        <h3>{h2}</h3>
      </div>
    </Responsive>
  </div>
);

Banner.propTypes = {
  h1: PropTypes.string,
  h2: PropTypes.string,
  bgMobile: PropTypes.string.isRequired,
  bgTablet: PropTypes.string.isRequired,
  bgDesktop: PropTypes.string.isRequired
};

Banner.defaultProps = {
  h1: '',
  h2: ''
};

export default observer(Banner);
