import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Popup } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import SocialButton from '../SocialButton';

const SocialButtonWithPopup = ({ href, icon, intl: { formatMessage } }) => (
  <Popup
    position="bottom right"
    content={`${formatMessage({
      id: 'socialButton.routeTo',
      defaultMessage: 'route to'
    })} ${icon}`}
    trigger={<SocialButton href={href} icon={icon} />}
  />
);
SocialButtonWithPopup.propTypes = {
  intl: PropTypes.shape().isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default observer(injectIntl(SocialButtonWithPopup));
