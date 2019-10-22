import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Grid, Segment } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';
import Card from '../Card';

@inject(({ categoriesStore, routingStore }) => ({
  navigate: routingStore.push,
  fetchCategories: categoriesStore.fetchCategories,
  isFetching: categoriesStore.isFetching,
  categories: categoriesStore.categories
}))
@observer
class Categories extends React.Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape)
  };

  static defaultProps = {
    categories: []
  };

  componentDidMount() {
    const { categories, fetchCategories } = this.props;

    // fetch only if we don't have it already
    if (!categories.length) {
      fetchCategories();
    }
  }

  handleClickCategory = category => {
    const { navigate } = this.props;

    navigate(`${appRoutes.categories}/${category.id}`);
  };

  render() {
    const { isFetching, categories } = this.props;

    return (
      <Segment
        className="categories no-borders fetching-min-height"
        loading={isFetching}
      >
        <Grid container columns={4}>
          {categories.map(category => (
            <Grid.Column key={category.id} mobile={16} tablet={8} computer={4}>
              <Card entity={category} onCardClick={this.handleClickCategory} />
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    );
  }
}

export default Categories;
