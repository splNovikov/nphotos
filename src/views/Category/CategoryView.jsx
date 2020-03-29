import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import Grid from '../../components/Grid';
import appRoutes from '../../constants/appRoutes';
import userPermissions from '../../constants/userPermissions';

import './CategoryView.scss';
import AlbumExtra from '../../components/Albums/AlbumExtra';

@inject(({ categoriesStore, userStore, routingStore }) => ({
  navigate: routingStore.push,
  fetchCategory: categoriesStore.fetchCategory,
  getCategory: categoriesStore.category,
  user: userStore.user
}))
@observer
class CategoryView extends Component {
  categoryId;

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.categoryId = id;
  }

  componentDidMount() {
    const { fetchCategory } = this.props;

    fetchCategory(this.categoryId);
  }

  mapExtraToCategoryAlbums = category => {
    return category.albums.map(album => ({
      ...album,
      to: `${appRoutes.albums}/${album.id}`,
      extra: album.categories ? <AlbumExtra album={album} /> : null
    }));
  };

  handleClickEdit = () => {
    const { navigate } = this.props;

    navigate(`${appRoutes.categoryEdit}/${this.categoryId}`);
  };

  render() {
    const {
      getCategory,
      intl: { formatMessage },
      user: { permissions }
    } = this.props;
    const category = getCategory(this.categoryId);

    console.log(category && category.albums);

    return category ? (
      <Segment className="category-view no-borders fetching-min-height">
        {permissions[userPermissions.canEditCategory] ? (
          <div className="edit-segment-wrapper">
            <Segment textAlign="right" className="no-borders">
              <Button
                onClick={this.handleClickEdit}
                labelPosition="left"
                positive
                icon="edit"
                content={formatMessage({
                  id: 'common.edit',
                  defaultMessage: 'edit'
                })}
              />
            </Segment>
          </div>
        ) : null}

        {category.albums && !category.albums.length ? (
          <Header as="h2" className="category-title capitalize">
            {formatMessage({
              id: 'categoryView.noAlbums',
              defaultMessage: 'No Albums'
            })}
          </Header>
        ) : null}

        {category.albums && category.albums.length ? (
          <>
            <Header as="h2" className="category-title capitalize">
              {category.title}
            </Header>

            <div className="albums-grid-wrapper">
              <Grid
                elements={this.mapExtraToCategoryAlbums(category)}
                imageHeight={200}
                circle={false}
              />
            </div>
          </>
        ) : null}
      </Segment>
    ) : null;
  }
}

CategoryView.wrappedComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      [userPermissions.canEditCategory]: PropTypes.bool
    })
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  fetchCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired
};

export default injectIntl(CategoryView);
