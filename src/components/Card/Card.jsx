import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card as SemanticCard } from 'semantic-ui-react';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

@observer
class Card extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string
    }).isRequired,
    onCardClick: PropTypes.func.isRequired
  };

  handleCardClick = () => {
    const { entity, onCardClick } = this.props;

    return onCardClick(entity);
  };

  render() {
    const { entity } = this.props;

    return (
      <SemanticCard
        className="card"
        raised
        centered
        onClick={this.handleCardClick}
      >
        <ResponsiveImage url={entity.cover} height={200} />
        <SemanticCard.Content>
          <SemanticCard.Header className="capitalize">
            {entity.title}
          </SemanticCard.Header>
        </SemanticCard.Content>
      </SemanticCard>
    );
  }
}

export default Card;
