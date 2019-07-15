import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Albums from '../../components/Albums';
import PrefilledBanner from './components/PrefilledBanner';

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
