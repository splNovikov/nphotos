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
  static propTypes = {
    priceList: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        price: PropTypes.string
      })
    ),
    fetchPriceList: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  static defaultProps = {
    priceList: []
  };

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
        <Grid container stackable>
          {priceList.map(row => (
            <Grid.Row key={row.index}>
              <SanitizeHTML html={row.price} />
            </Grid.Row>
          ))}
        </Grid>
      </Segment>
    );
  }
}

export default PriceListView;
