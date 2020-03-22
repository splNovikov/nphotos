import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';
import Grid from '../Grid';
import CategoryExtra from './CategoryExtra';

@inject(({ categoriesStore }) => ({
  fetchCategories: categoriesStore.fetchCategories,
  isFetching: categoriesStore.isFetching,
  categories: categoriesStore.categories
}))
@observer
class Categories extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;

    fetchCategories();
  }

  fillCategoriesWithExtraProps = categories =>
    categories.map(category => ({
      ...category,
      to: `${appRoutes.categories}/${category.id}`,
      extra: <CategoryExtra albumsCount={category.albumsCount} />
    }));

  render() {
    const { isFetching, categories } = this.props;
    const elements = this.fillCategoriesWithExtraProps(categories);

    return (
      <Segment
        className="categories no-borders fetching-min-height"
        loading={isFetching}
      >
        <Grid
          elements={elements}
          imageHeight={200}
          imagePadding={0}
          circle={false}
        />
      </Segment>
    );
  }
}

Categories.wrappedComponent.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape)
};

Categories.wrappedComponent.defaultProps = {
  categories: []
};

export default Categories;
