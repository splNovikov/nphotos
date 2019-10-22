import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card as SemanticCard } from 'semantic-ui-react';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import './Card.scss';

@observer
class Card extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string
    }).isRequired,
    onCardClick: PropTypes.func.isRequired,
    height: PropTypes.number
  };

  static defaultProps = {
    height: 200
  };

  handleCardClick = () => {
    const { entity, onCardClick } = this.props;

    return onCardClick(entity);
  };

  render() {
    const { entity, height } = this.props;

    return (
      <SemanticCard
        className="common-card"
        raised
        centered
        onClick={this.handleCardClick}
      >
        <ResponsiveImage url={entity.cover} height={height} />
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

export default Card;
