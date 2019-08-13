import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class PriceView extends Component {
  render() {
    return <div className="price-view">Price</div>;
  }
}

export default PriceView;
