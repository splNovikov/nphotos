import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Grid as SemanticGrid } from 'semantic-ui-react';

import Card from '../Card';

@observer
class Grid extends Component {
  render() {
    const {
      elements,
      onCardClick,
      circle,
      imageHeight,
      imagePadding
    } = this.props;

    return (
      <SemanticGrid container>
        {elements.map(el => (
          <SemanticGrid.Column key={el.id} mobile={16} tablet={8} computer={4}>
            <Card
              entity={el}
              onCardClick={onCardClick}
              circle={circle}
              height={imageHeight}
              imagePadding={imagePadding}
            />
          </SemanticGrid.Column>
        ))}
      </SemanticGrid>
    );
  }
}

Grid.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      cover: PropTypes.string
    }).isRequired
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
  // disable next rule, because those properties in this component are optional
  /* eslint-disable react/require-default-props */
  circle: PropTypes.bool,
  imageHeight: PropTypes.number,
  imagePadding: PropTypes.number
  /* eslint-enable react/require-default-props */
};

export default Grid;
