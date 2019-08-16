import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';

@observer
class PriceListView extends Component {
  render() {
    return (
      <Segment className="price-list-view no-borders fetching-min-height">
        <Grid container stackable>
          <Grid.Column>
            <Grid.Row>Price List</Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default PriceListView;
