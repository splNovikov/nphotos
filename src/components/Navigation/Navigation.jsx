import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';

import appRoutes from '../../constants/appRoutes';
import { showCategories } from '../../utils';

@inject(({ commonStore, routingStore }) => ({
  location: routingStore.location,
  closeSidebar: commonStore.closeSidebar
}))
@observer
class Navigation extends Component {
  render() {
    const {
      intl: { formatMessage },
      closeSidebar
    } = this.props;

    return (
      <>
        <Menu.Item
          as={NavLink}
          onClick={closeSidebar}
          exact
          to="/"
          content={formatMessage({
            id: 'navigationMenu.home',
            defaultMessage: 'home'
          })}
        />
        {showCategories && (
          <Menu.Item
            as={NavLink}
            onClick={closeSidebar}
            exact
            to={appRoutes.categories}
            content={formatMessage({
              id: 'navigationMenu.categories',
              defaultMessage: 'categories'
            })}
          />
        )}
        <Menu.Item
          as={NavLink}
          onClick={closeSidebar}
          exact
          to={appRoutes.albums}
          content={formatMessage({
            id: 'navigationMenu.albums',
            defaultMessage: 'albums'
          })}
        />
        <Menu.Item
          as={NavLink}
          onClick={closeSidebar}
          to={appRoutes.about}
          content={formatMessage({
            id: 'navigationMenu.about',
            defaultMessage: 'about'
          })}
        />
        <Menu.Item
          as={NavLink}
          onClick={closeSidebar}
          to={appRoutes.contacts}
          content={formatMessage({
            id: 'navigationMenu.contacts',
            defaultMessage: 'contacts'
          })}
        />
        <Menu.Item
          as={NavLink}
          onClick={closeSidebar}
          to={appRoutes.priceList}
          content={formatMessage({
            id: 'navigationMenu.priceList',
            defaultMessage: 'price list'
          })}
        />
      </>
    );
  }
}

Navigation.wrappedComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  closeSidebar: PropTypes.func.isRequired
};

export default injectIntl(Navigation);
