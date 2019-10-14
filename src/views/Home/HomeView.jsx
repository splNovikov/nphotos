import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Albums from '../../components/Albums';
import PrefilledBanner from './components/PrefilledBanner';

@observer
class HomeView extends Component {
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
  }

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
