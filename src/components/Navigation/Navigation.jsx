import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';
import { inject, observer } from 'mobx-react';

@inject(({ routingStore }) => ({
  location: routingStore.location
}))
@observer
class Navigation extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    intl: intlShape
  };

  render() {
    const {
      intl: { formatMessage }
    } = this.props;

    return (
      <React.Fragment>
        <Menu.Item
          as={NavLink}
          exact
          to="/"
          content={formatMessage({
            id: 'navigationMenu.home',
            defaultMessage: 'home'
          })}
        />
        <Menu.Item
          as={NavLink}
          exact
          to="/albums"
          content={formatMessage({
            id: 'navigationMenu.albums',
            defaultMessage: 'albums'
          })}
        />
        <Menu.Item
          as={NavLink}
          to="/about"
          content={formatMessage({
            id: 'navigationMenu.about',
            defaultMessage: 'about'
          })}
        />
        <Menu.Item
          as={NavLink}
          to="/contacts"
          content={formatMessage({
            id: 'navigationMenu.contacts',
            defaultMessage: 'contacts'
          })}
        />
      </React.Fragment>
    );
  }
}

export default injectIntl(Navigation);
