import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Categories from '../../components/Categories';

@observer
class CategoriesView extends Component {
  render() {
    return (
      <div className="categories-view">
        <Categories />
      </div>
    );
  }
}

export default CategoriesView;
