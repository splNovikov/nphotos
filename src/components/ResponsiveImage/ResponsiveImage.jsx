import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './ResponsiveImage.scss';

const gradient = percent =>
  `linear-gradient(180deg, rgba(255,255,255,0) ${percent}%, rgba(255,255,255,1) 100%)`;

const setStyle = (url, circle, height, withGradient) => {
  const backgroundImage = `${
    withGradient ? `${gradient(withGradient)}, ` : ''
  }url(${url})`;
  const style = {
    backgroundImage,
    height
  };

  // make picture circle, not "ellipse"
  if (circle) {
    style.width = height;
  }

  return style;
};

const ResponsiveImage = ({ url, circle, height, padding, withGradient }) => (
  <div className="responsive-image-container" style={{ padding }}>
    <figure
      className={`responsive-image ${circle ? 'circle' : ''}`}
      style={setStyle(url, circle, height, withGradient)}
    />
  </div>
);

ResponsiveImage.propTypes = {
  url: PropTypes.string.isRequired,
  height: PropTypes.number,
  circle: PropTypes.bool,
  padding: PropTypes.number,
  withGradient: PropTypes.number
};

ResponsiveImage.defaultProps = {
  height: 150,
  circle: false,
  padding: 0,
  withGradient: 0
};

export default observer(ResponsiveImage);
