import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Menu, Sidebar } from 'semantic-ui-react';
import ReactResizeDetector from 'react-resize-detector';
import { SemanticToastContainer } from 'react-semantic-toasts';

import Header from '../Header';
import Footer from '../Footer';
import Navigation from '../Navigation';
import routes from '../../routes';
import { debounce } from '../../utils';

import './App.scss';

@inject(({ commonStore, userStore }) => ({
  isSideBarOpened: commonStore.isSidebarOpened,
  closeSidebar: commonStore.closeSidebar,
  fetchUser: userStore.fetchUser
}))
@observer
class App extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;

    // fetching user
    fetchUser();
    // subscribe on window.resize -> close sidebar
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  // eslint-disable-next-line react/destructuring-assignment
  onResize = debounce(this.props.closeSidebar, 400);

  render() {
    const { isSideBarOpened, closeSidebar } = this.props;

    return (
      <div className="app">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            onHide={closeSidebar}
            vertical
            visible={isSideBarOpened}
          >
            <Navigation />
          </Sidebar>

          <Sidebar.Pusher dimmed={isSideBarOpened} className="app-wrapper">
            <Header />

            <div className="view-container">{routes}</div>

            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <ReactResizeDetector handleWidth onResize={this.onResize} />
        <SemanticToastContainer position="bottom-right" />
      </div>
    );
  }
}

App.wrappedComponent.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  isSideBarOpened: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired
};

export default App;
