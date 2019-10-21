import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

@inject(() => ({}))
@observer
class CategoryView extends Component {
  render() {
    return (
      <Segment className="category-view no-borders fetching-min-height">
        Category
      </Segment>
    );
  }
}

export default injectIntl(CategoryView);
