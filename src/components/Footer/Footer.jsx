import React from 'react';
import { Segment, Container, List, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import './Footer.scss';

const Footer = () => (
  <Segment secondary vertical className="footer">
    <Container textAlign="center">
      <Image centered size="tiny" src={logo} />
      <List horizontal divided link size="small">
        <List.Item as={NavLink} to="/">
          Contact Us
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;
