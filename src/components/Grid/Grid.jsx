import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Confirm, Grid as SemanticGrid } from 'semantic-ui-react';

import Card from '../Card';

@observer
class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRemoveModalOpened: false,
      removeModalEntity: null
    };
  }

  handleRemoveEntity = entity => {
    this.setState({
      isRemoveModalOpened: true,
      removeModalEntity: entity
    });
  };

  removeEntity = () => {
    const { onRemove } = this.props;
    const { removeModalEntity } = this.state;

    if (onRemove && removeModalEntity) {
      onRemove(removeModalEntity);
    }

    this.closeRemoveModal();
  };

  closeRemoveModal = () => {
    this.setState({
      isRemoveModalOpened: false,
      removeModalEntity: null
    });
  };

  render() {
    const {
      elements,
      onCardClick,
      circle,
      imageHeight,
      imagePadding,
      withGradient,
      canRemove
    } = this.props;

    const { isRemoveModalOpened } = this.state;

    return (
      <SemanticGrid container>
        <Confirm
          open={isRemoveModalOpened}
          onCancel={this.closeRemoveModal}
          onConfirm={this.removeEntity}
          size="mini"
        />
        {elements.map(el => (
          <SemanticGrid.Column key={el.id} mobile={16} tablet={8} computer={4}>
            <Card
              entity={el}
              onCardClick={onCardClick}
              circle={circle}
              height={imageHeight}
              imagePadding={imagePadding}
              withGradient={withGradient}
              canRemove={canRemove}
              onRemove={this.handleRemoveEntity}
            />
          </SemanticGrid.Column>
        ))}
      </SemanticGrid>
    );
  }
}

Grid.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  canRemove: PropTypes.bool,
  // disable next rule, because those properties in this component are optional
  /* eslint-disable react/require-default-props */
  onCardClick: PropTypes.func,
  circle: PropTypes.bool,
  imageHeight: PropTypes.number,
  imagePadding: PropTypes.number,
  withGradient: PropTypes.number,
  onRemove: PropTypes.func
  /* eslint-enable react/require-default-props */
};

Grid.defaultProps = {
  canRemove: false
};

export default Grid;
