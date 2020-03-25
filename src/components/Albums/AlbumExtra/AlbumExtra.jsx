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
    const { album } = this.props;

    return (
      <div className="album-extra">
        <div>{album.imagesCount}</div>
        <List>
          {album.categories.map(category => (
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
  album: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape()),
    imagesCount: PropTypes.number
  }),
  navigate: PropTypes.func.isRequired
};

AlbumExtra.wrappedComponent.defaultProps = {
  album: {
    categories: []
  }
};

export default AlbumExtra;
