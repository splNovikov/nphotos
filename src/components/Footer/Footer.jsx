import React from 'react';
import { Segment, Container, List, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import appRoutes from '../../constants/appRoutes';
import logo from '../../assets/images/logo.svg';
import SocialLinks from '../SocialLinks';

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

      <List horizontal divided link size="small">
        <List.Item
          exact
          as={NavLink}
          to="/"
          content={formatMessage({
            id: 'navigationMenu.home',
            defaultMessage: 'home'
          })}
        />
        <List.Item
          exact
          as={NavLink}
          to={appRoutes.albums}
          content={formatMessage({
            id: 'navigationMenu.albums',
            defaultMessage: 'albums'
          })}
        />
        <List.Item
          as={NavLink}
          to={appRoutes.about}
          content={formatMessage({
            id: 'navigationMenu.about',
            defaultMessage: 'about'
          })}
        />
        <List.Item
          as={NavLink}
          to={appRoutes.contacts}
          content={formatMessage({
            id: 'navigationMenu.contacts',
            defaultMessage: 'contacts'
          })}
        />
        <List.Item
          as={NavLink}
          to={appRoutes.priceList}
          content={formatMessage({
            id: 'navigationMenu.priceList',
            defaultMessage: 'price list'
          })}
        />
      </List>
    </Container>
  </Segment>
);

Footer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  intl: intlShape
};

export default injectIntl(Footer);
