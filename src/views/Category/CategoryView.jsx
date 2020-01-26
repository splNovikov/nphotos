import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import Grid from '../../components/Grid';
import appRoutes from '../../constants/appRoutes';
import userPermissions from '../../constants/userPermissions';

import './CategoryView.scss';

@inject(({ categoriesStore, userStore, routingStore }) => ({
  navigate: routingStore.push,
  fetchCategory: categoriesStore.fetchCategory,
  isFetching: categoriesStore.isFetching,
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

  handleClickAlbum = album => {
    const { navigate } = this.props;

    navigate(`${appRoutes.albums}/${album.id}`);
  };

  hasAlbums = category => category && category.albums && category.albums.length;

  handleClickEdit = () => {
    const { navigate } = this.props;

    navigate(`${appRoutes.categoryEdit}/${this.categoryId}`);
  };

  render() {
    const {
      isFetching,
      getCategory,
      intl: { formatMessage },
      user: { permissions }
    } = this.props;
    const category = getCategory(this.categoryId);

    return (
      <Segment
        className="category-view no-borders fetching-min-height"
        loading={isFetching}
      >
        {!this.hasAlbums(category) && !isFetching ? (
          <Header as="h2" className="category-title capitalize">
            {formatMessage({
              id: 'categoryView.noAlbums',
              defaultMessage: 'No Albums in this category'
            })}
          </Header>
        ) : null}

        {permissions[userPermissions.canEditCategory] ? (
          <div className="edit-segment-wrapper">
            <Segment textAlign="right">
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

        {this.hasAlbums(category) ? (
          <>
            <Header as="h2" className="category-title capitalize">
              {category.title}
            </Header>

            <div className="albums-grid-wrapper">
              <Grid
                elements={category.albums}
                onCardClick={this.handleClickAlbum}
                columns={3}
                imageHeight={200}
                circle={false}
              />
            </div>
          </>
        ) : null}
      </Segment>
    );
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
  isFetching: PropTypes.bool.isRequired,
  getCategory: PropTypes.func.isRequired
};

export default injectIntl(CategoryView);
