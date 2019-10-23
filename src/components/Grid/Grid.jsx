import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Grid as SemanticGrid } from 'semantic-ui-react';

import Card from '../Card';

@observer
class Grid extends Component {
  static propTypes = {
    entity: PropTypes.shape({
      elements: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          description: PropTypes.string,
          cover: PropTypes.string
        }).isRequired
      )
    }).isRequired,
    onCardClick: PropTypes.func.isRequired
  };

  // todo: columns, circle, imageHeight should be configurable
  render() {
    const { entity, onCardClick } = this.props;

    return (
      <SemanticGrid container columns={3}>
        {entity.elements.map(el => (
          <SemanticGrid.Column key={el.id} mobile={16} tablet={8} computer={4}>
            <Card entity={el} onCardClick={onCardClick} />
          </SemanticGrid.Column>
        ))}
      </SemanticGrid>
    );
  }
}

export default Grid;
