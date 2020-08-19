import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

import SanitizeHTML from '../../components/SanitizeHTML';

@inject(({ priceListStore }) => ({
  fetchPriceList: priceListStore.fetchPriceList,
  priceList: priceListStore.priceList
}))
@observer
class PriceListView extends Component {
  componentDidMount() {
    const { fetchPriceList, priceList } = this.props;

    if (!priceList.length) {
      fetchPriceList();
    }
  }

  render() {
    const { priceList } = this.props;

    return (
      <Segment className="price-list-view no-borders fetching-min-height">
        <Grid container stackable padded="vertically" columns={2}>
          {priceList.map(row =>
            row.price ? (
              <Grid.Column key={row.index}>
                <SanitizeHTML html={row.price} />
              </Grid.Column>
            ) : null
          )}
        </Grid>
      </Segment>
    );
  }
}

PriceListView.wrappedComponent.propTypes = {
  priceList: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.string,
      price: PropTypes.string
    })
  ),
  fetchPriceList: PropTypes.func.isRequired
};

PriceListView.wrappedComponent.defaultProps = {
  priceList: []
};

export default PriceListView;
