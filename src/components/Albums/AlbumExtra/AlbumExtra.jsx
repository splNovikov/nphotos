import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { List } from 'semantic-ui-react';

import appRoutes from '../../../constants/appRoutes';
import CategoryShort from '../CategoryShort';

@inject(({ routingStore }) => ({
  navigate: routingStore.push
}))
@observer
class AlbumExtra extends Component {
  handleCategoryClick = category => {
    const { navigate } = this.props;

    navigate(`${appRoutes.categories}/${category.id}`);
  };

  render() {
    const { categories } = this.props;

    return (
      <div className="album-extra">
        <List>
          {categories.map(category => (
            <CategoryShort
              key={category.id}
              category={category}
              onCategoryClick={this.handleCategoryClick}
            />
          ))}
        </List>
      </div>
    );
  }
}
AlbumExtra.wrappedComponent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()),
  navigate: PropTypes.func.isRequired
};

AlbumExtra.wrappedComponent.defaultProps = {
  categories: []
};

export default AlbumExtra;
