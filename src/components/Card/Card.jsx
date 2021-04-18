import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Card as SemanticCard } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import './Card.scss';

@observer
class Card extends Component {
  handleCardClick = () => {
    const { entity, onCardClick } = this.props;

    if (onCardClick) {
      onCardClick(entity);
    }
  };

  handleRemoveClick = e => {
    e.stopPropagation();

    const { entity, onRemove } = this.props;

    if (onRemove) {
      onRemove(entity);
    }
  };

  render() {
    const {
      entity,
      height,
      circle,
      imagePadding,
      withGradient,
      canRemove
    } = this.props;

    /* eslint-disable react/jsx-props-no-spreading */
    // We have to made this spread operator there
    return (
      <SemanticCard
        className="common-card"
        raised
        centered
        {...(entity.to ? { as: NavLink, to: entity.to } : {})}
        onClick={this.handleCardClick}
      >
        {entity.cover ? (
          <ResponsiveImage
            url={entity.cover}
            height={height}
            circle={circle}
            padding={imagePadding}
            withGradient={withGradient}
          />
        ) : null}

        {entity.title || entity.description ? (
          <SemanticCard.Content>
            {entity.title ? (
              <SemanticCard.Header className="capitalize">
                {entity.title}
              </SemanticCard.Header>
            ) : null}
            {entity.description ? (
              <SemanticCard.Description className="capitalize">
                {entity.description}
              </SemanticCard.Description>
            ) : null}
          </SemanticCard.Content>
        ) : null}

        {entity.extra ? (
          <SemanticCard.Content extra>{entity.extra}</SemanticCard.Content>
        ) : null}
        {canRemove ? (
          <SemanticCard.Content extra>
            <Button compact icon="trash" onClick={this.handleRemoveClick} />
          </SemanticCard.Content>
        ) : null}
      </SemanticCard>
    );
    /* eslint-enable react/jsx-props-no-spreading */
  }
}

Card.propTypes = {
  entity: PropTypes.shape({
    title: PropTypes.string,
    cover: PropTypes.string,
    description: PropTypes.string,
    to: PropTypes.string,
    extra: PropTypes.element
  }).isRequired,
  circle: PropTypes.bool,
  canRemove: PropTypes.bool,
  // disable next rule, because those properties in this component are optional
  /* eslint-disable react/require-default-props */
  onCardClick: PropTypes.func,
  height: PropTypes.number,
  imagePadding: PropTypes.number,
  withGradient: PropTypes.number,
  removeHandler: PropTypes.func,
  onRemove: PropTypes.func
  /* eslint-enable react/require-default-props */
};

Card.defaultProps = {
  circle: false,
  canRemove: false
};

export default Card;
