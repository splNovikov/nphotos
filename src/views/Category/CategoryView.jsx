import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '../../components/Grid';

import './CategoryView.scss';

@inject(({ categoriesStore }) => ({
  fetchCategory: categoriesStore.fetchCategory,
  isFetching: categoriesStore.isFetching,
  getCategory: categoriesStore.category
}))
@observer
class CategoryView extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    intl: intlShape,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }).isRequired,
    fetchCategory: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getCategory: PropTypes.func.isRequired
  };

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
    const { getCategory, fetchCategory } = this.props;

    // fetch only if we don't have it already
    if (!getCategory(this.categoryId)) {
      fetchCategory(this.categoryId);
    }
  }

  mapToGridEntity = category => ({
    ...category,
    elements: category.albums
  });

  // todo:
  handleClickAlbum = album => {};

  categoryId;

  render() {
    const {
      isFetching,
      getCategory,
      intl: { formatMessage }
    } = this.props;
    const category = getCategory(this.categoryId);

    return (
      <Segment
        className="category-view no-borders fetching-min-height"
        loading={isFetching}
      >
        {(!category || !category.albums.length) && !isFetching ? (
          <Header as="h2" className="category-title capitalize">
            {formatMessage({
              id: 'categoryView.noAlbums',
              defaultMessage: 'No Albums in this category'
            })}
          </Header>
        ) : null}

        {category && category.albums.length ? (
          <React.Fragment>
            <Header as="h2" className="category-title capitalize">
              {formatMessage({
                id: 'common.category',
                defaultMessage: 'Category'
              })}
              : {category.title}
            </Header>

            <Grid
              entity={this.mapToGridEntity(category)}
              onCardClick={this.handleClickAlbum}
            />
          </React.Fragment>
        ) : null}
      </Segment>
    );
  }
}

export default injectIntl(CategoryView);
