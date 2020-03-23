import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Image, List } from 'semantic-ui-react';

import './CategoryShort.scss';

@observer
class CategoryShort extends Component {
  handleCategoryClick = e => {
    e.stopPropagation();
    e.preventDefault();

    const { category, onCategoryClick } = this.props;

    onCategoryClick(category);
  };

  render() {
    const { category } = this.props;

    return (
      <List.Item className="category-short" onClick={this.handleCategoryClick}>
        <Image avatar src={category.cover} />
        <List.Content>{category.title}</List.Content>
      </List.Item>
    );
  }
}
CategoryShort.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string
  }).isRequired,
  onCategoryClick: PropTypes.func.isRequired
};

export default CategoryShort;
