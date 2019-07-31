import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import Navigation from '../Navigation';
import logo from '../../assets/images/logo.svg';

import './Header.scss';

@inject(({ commonStore }) => ({
  toggleSidebar: commonStore.toggleSidebar
}))
@observer
class Header extends Component {
  static propTypes = {
    toggleSidebar: PropTypes.func.isRequired
  };

  render() {
    const { toggleSidebar } = this.props;

    return (
      <div className="header">
        <div className="links">
          <a
            href="https://vk.com/nphotos_ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="vk" />
          </a>
          <a
            href="https://www.instagram.com/_u/nphotos.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="instagram" />
          </a>
        </div>

        <Menu className="navigation-menu-sm">
          <Menu.Item onClick={toggleSidebar}>
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu>

        <Menu className="navigation-menu-lg">
          <Menu.Item as={NavLink} className="item-wrapper-for-logo" to="/">
            <img src={logo} alt="logo" className="logo" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Navigation />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Header;
