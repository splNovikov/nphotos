import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'semantic-ui-react';

const SocialButton = ({ href, icon, onMouseEnter, onMouseLeave }) => (
  <Button
    compact
    icon={icon}
    href={href}
    target="_blank"
    className="transparent"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  />
);

SocialButton.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  onMouseEnter: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  onMouseLeave: PropTypes.func
};

export default observer(SocialButton);
