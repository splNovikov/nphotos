import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Categories from '../../components/Categories';
import PrefilledBanner from './components/PrefilledBanner';

@observer
class HomeView extends Component {
  render() {
    return (
      <div className="home-view">
        <PrefilledBanner />
        <Categories />
      </div>
    );
  }
}

export default HomeView;
