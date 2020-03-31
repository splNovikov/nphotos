import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Popup } from 'semantic-ui-react';

import SocialButton from '../SocialButton';

const SocialButtonWithPopup = ({ href, icon }) => (
  <Popup
    position="bottom right"
    content={href}
    trigger={<SocialButton href={href} icon={icon} />}
  />
);
SocialButtonWithPopup.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default observer(SocialButtonWithPopup);
