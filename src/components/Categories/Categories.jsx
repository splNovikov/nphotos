import React from 'react';
import { observer, inject } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

@inject(({ routingStore }) => ({
  navigate: routingStore.push
}))
@observer
class Categories extends React.Component {
  static defaultProps = {
    categories: []
  };

  componentDidMount() {}

  render() {
    return (
      <Segment className="categories no-borders fetching-min-height">
        Categoriiiies
      </Segment>
    );
  }
}

export default Categories;
