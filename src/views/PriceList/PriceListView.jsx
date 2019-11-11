import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

import SanitizeHTML from '../../components/SanitizeHTML';

@inject(({ priceListStore }) => ({
  fetchPriceList: priceListStore.fetchPriceList,
  isFetching: priceListStore.isFetching,
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
    const { isFetching, priceList } = this.props;

    return (
      <Segment
        className="price-list-view no-borders fetching-min-height"
        loading={isFetching}
      >
        <Grid container stackable padded="vertically">
          {priceList.map(row =>
            row.price ? (
              <Grid.Row key={row.index}>
                <SanitizeHTML html={row.price} />
              </Grid.Row>
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
  fetchPriceList: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

PriceListView.wrappedComponent.defaultProps = {
  priceList: []
};

export default PriceListView;
