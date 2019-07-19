import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Menu, Sidebar } from 'semantic-ui-react';
import ReactResizeDetector from 'react-resize-detector';

import Header from '../Header';
import Footer from '../Footer';
import Navigation from '../Navigation';
import routes from '../../routes';
import debounce from '../../utils/debounce';

import './App.scss';

const DevTools =
  process.env.NODE_ENV !== 'production'
    ? require('mobx-react-devtools').default
    : Fragment;

@inject(({ commonStore }) => ({
  isSideBarOpened: commonStore.isSidebarOpened,
  closeSidebar: commonStore.closeSidebar
}))
@observer
class App extends Component {
  static propTypes = {
    isSideBarOpened: PropTypes.bool.isRequired,
    closeSidebar: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
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

          <Sidebar.Pusher dimmed={isSideBarOpened}>
            <Header />

            <div className="view-container">{routes}</div>

            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <ReactResizeDetector handleWidth onResize={this.onResize} />
        <DevTools />
      </div>
    );
  }
}

export default App;
