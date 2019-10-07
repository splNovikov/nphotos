import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'semantic-ui-react';

const SocialButton = ({ href, icon, ...rest }) => (
  <Button
    compact
    icon={icon}
    href={href}
    target="_blank"
    className="transparent"
    {...rest}
  />
);
SocialButton.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default observer(SocialButton);
