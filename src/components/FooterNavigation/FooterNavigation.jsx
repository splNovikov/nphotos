import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';

import appRoutes from '../../constants/appRoutes';

import './FooterNavigation.scss';

@inject(({ routingStore }) => ({
  // added this to observe location - for state changing
  location: routingStore.location
}))
@observer
class Footer extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props;

    return (
      <List horizontal divided link size="small" className="footer-navigation">
        <List.Item
          as={NavLink}
          exact
          to="/"
          content={formatMessage({
            id: 'navigationMenu.home',
            defaultMessage: 'home'
          })}
        />
        <List.Item
          as={NavLink}
          exact
          to={appRoutes.categories}
          content={formatMessage({
            id: 'navigationMenu.categories',
            defaultMessage: 'categories'
          })}
        />
        <List.Item
          as={NavLink}
          exact
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
    );
  }
}

Footer.propTypes = {
  intl: PropTypes.shape.isRequired
};

export default injectIntl(Footer);
