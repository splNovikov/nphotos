import React from 'react';
import PropTypes from 'prop-types';

import './ResponsiveImage.scss';

const ResponsiveImage = ({ url }) => (
  <figure
    className="responsive-image"
    style={{ backgroundImage: `url(${url})` }}
  />
);

ResponsiveImage.propTypes = {
  url: PropTypes.string.isRequired
};

export default ResponsiveImage;
