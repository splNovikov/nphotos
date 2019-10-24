import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './ResponsiveImage.scss';

const setStyle = (url, circle, height) => {
  const style = {
    backgroundImage: `url(${url})`,
    height
  };

  // make picture circle, not "ellipse"
  if (circle) {
    style.width = height;
  }

  return style;
};

const ResponsiveImage = ({ url, circle, height, padding }) => (
  <div className="responsive-image-container" style={{ padding }}>
    <figure
      className={`responsive-image ${circle ? 'circle' : ''}`}
      style={setStyle(url, circle, height, padding)}
    />
  </div>
);

ResponsiveImage.propTypes = {
  url: PropTypes.string.isRequired,
  height: PropTypes.number,
  circle: PropTypes.bool,
  padding: PropTypes.number
};

ResponsiveImage.defaultProps = {
  height: 150,
  circle: false,
  padding: 0
};

export default observer(ResponsiveImage);
