import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card as SemanticCard } from 'semantic-ui-react';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import './Card.scss';

@observer
// todo: {Component everywhere instead of React.Component }
class Card extends React.Component {
  handleCardClick = () => {
    const { entity, onCardClick } = this.props;

    return onCardClick(entity);
  };

  render() {
    const { entity, height, circle, imagePadding } = this.props;

    return (
      <SemanticCard
        className="common-card"
        raised
        centered
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
      </SemanticCard>
    );
  }
}

Card.propTypes = {
  entity: PropTypes.shape({
    title: PropTypes.string,
    cover: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  circle: PropTypes.bool,
  // disable next rule, because those properties in this component are optional
  /* eslint-disable react/require-default-props */
  height: PropTypes.number,
  imagePadding: PropTypes.number
  /* eslint-enable react/require-default-props */
};

Card.defaultProps = {
  circle: false
};

export default Card;
