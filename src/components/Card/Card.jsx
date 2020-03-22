import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card as SemanticCard } from 'semantic-ui-react';
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

  render() {
    const { entity, height, circle, imagePadding } = this.props;

    return (
      <SemanticCard
        className="common-card"
        raised
        centered
        {...(entity.to ? { as: NavLink, to: entity.to } : {})}
        onClick={this.handleCardClick}
      >
        <ResponsiveImage
          url={entity.cover}
          height={height}
          circle={circle}
          padding={imagePadding}
        />
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
        {entity.extra ? (
          <SemanticCard.Content extra>{entity.extra}</SemanticCard.Content>
        ) : null}
      </SemanticCard>
    );
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
  // disable next rule, because those properties in this component are optional
  /* eslint-disable react/require-default-props */
  onCardClick: PropTypes.func,
  height: PropTypes.number,
  imagePadding: PropTypes.number
  /* eslint-enable react/require-default-props */
};

Card.defaultProps = {
  circle: false
};

export default Card;
