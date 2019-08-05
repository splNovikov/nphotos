import React from 'react';
import PropTypes from 'prop-types';

import './ResponsiveImage.scss';

const ResponsiveImage = ({ url, height }) => (
  <figure
    className="responsive-image"
    style={{ backgroundImage: `url(${url})`, height }}
  />
);

ResponsiveImage.propTypes = {
  url: PropTypes.string.isRequired,
  height: PropTypes.number
};

ResponsiveImage.defaultProps = {
  height: 150
};

export default ResponsiveImage;
