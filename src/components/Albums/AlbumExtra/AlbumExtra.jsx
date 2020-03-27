import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { List } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import appRoutes from '../../../constants/appRoutes';
import CategoryShort from '../CategoryShort';

import './AlbumExtra.scss';

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
    const {
      album,
      intl: { formatMessage }
    } = this.props;

    return (
      <div className="album-extra">
        <div>
          {formatMessage({
            id: 'common.imagesCount',
            defaultMessage: 'imagesCount'
          })}
          {`: ${album.imagesCount}`}
        </div>
        <List>
          {formatMessage({
            id: 'common.categories',
            defaultMessage: 'categories'
          })}
          :
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
  intl: PropTypes.shape().isRequired,
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

export default injectIntl(AlbumExtra);
