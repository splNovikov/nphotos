import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import SocialButton from '../SocialButton';

const SocialButtonWithPopup = ({ href, icon }) => (
  <Popup
    inverted
    content={href}
    trigger={<SocialButton href={href} icon={icon} />}
  />
);
SocialButtonWithPopup.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default SocialButtonWithPopup;
