import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Image } from 'semantic-ui-react';

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
      <Image
        spaced
        avatar
        src={category.cover}
        onClick={this.handleCategoryClick}
      />
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
