import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';

import ResponsiveImage from '../ResponsiveImage';

import './ImageCard.scss';

@observer
class ImageCard extends React.Component {
  static propTypes = {
    image: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { image, onClick } = this.props;

    return onClick(image);
  };

  render() {
    const { image } = this.props;

    return (
      <Card
        role="none"
        className="image-card"
        raised
        onClick={this.handleClick}
      >
        <ResponsiveImage url={image.src} />
        {image.title ? (
          <Card.Content>
            <Card.Description>{image.title}</Card.Description>
          </Card.Content>
        ) : null}
      </Card>
    );
  }
}

export default ImageCard;
