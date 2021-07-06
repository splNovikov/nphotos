import React, { Component } from 'react';
import { observer } from 'mobx-react';

import PrefilledBanner from './components/PrefilledBanner';
import Albums from '../../components/Albums';

@observer
class HomeView extends Component {
  render() {
    return (
      <div className="home-view">
        <PrefilledBanner />
        <Albums />
      </div>
    );
  }
}

export default HomeView;
