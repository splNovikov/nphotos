import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'semantic-ui-react';

const SocialButton = ({
  href,
  icon,
  onMouseEnter,
  onMouseLeave,
  onBlur,
  onClick,
  onFocus
}) => (
  <Button
    compact
    icon={icon}
    href={href}
    target="_blank"
    className="transparent"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onBlur={onBlur}
    onClick={onClick}
    onFocus={onFocus}
  />
);

SocialButton.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default observer(SocialButton);
