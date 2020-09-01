import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Image, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';

import logo from '../../assets/images/logo.svg';
import SocialLinks from '../SocialLinks';
import FooterNavigation from '../FooterNavigation';

import './Footer.scss';

const Footer = ({ intl: { formatMessage } }) => (
  <Segment raised vertical className="footer">
    <Container textAlign="center">
      <div className="links-wrapper">
        <SocialLinks />
      </div>

      <Image
        className="logo"
        centered
        size="tiny"
        src={logo}
        as={NavLink}
        to="/"
      />

      <Header as="h6">
        {formatMessage({
          id: 'footer.imageQualityAttention',
          defaultMessage: 'upload'
        })}
      </Header>

      <FooterNavigation />
    </Container>
  </Segment>
);

Footer.propTypes = {
  intl: PropTypes.shape().isRequired
};

export default observer(injectIntl(Footer));
