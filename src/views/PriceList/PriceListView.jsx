import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import SanitizeHTML from '../../components/SanitizeHTML';

// @inject(({ priceListStore }) => ({
//   fetchPrice: priceListStore.fetchPrice,
//   isFetching: priceListStore.isFetching,
//   price: priceListStore.priceList
// }))
@observer
class PriceListView extends Component {
  render() {
    return <div className="price-list-view">priceList</div>;
  }
}

export default PriceListView;
