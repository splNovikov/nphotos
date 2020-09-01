import React from 'react';
import { Segment, Container, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import logo from '../../assets/images/logo.svg';
import SocialLinks from '../SocialLinks';
import FooterNavigation from '../FooterNavigation';

import './Footer.scss';

const Footer = () => (
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

      <FooterNavigation />
    </Container>
  </Segment>
);

export default observer(Footer);
