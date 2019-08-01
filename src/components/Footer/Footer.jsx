import React from 'react';
import { Segment, Container, List, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import logo from '../../assets/images/logo.svg';
import './Footer.scss';

// todo: add contact us
const Footer = ({ intl: { formatMessage } }) => (
  <Segment secondary vertical className="footer">
    <Container textAlign="center">
      <div>
        <Image centered size="tiny" src={logo} as={NavLink} to="/" />
      </div>

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
          to="/albums"
          content={formatMessage({
            id: 'navigationMenu.albums',
            defaultMessage: 'albums'
          })}
        />
        <List.Item
          as={NavLink}
          to="/about"
          content={formatMessage({
            id: 'navigationMenu.about',
            defaultMessage: 'about'
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
