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
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { index, onClick } = this.props;

    return onClick(index);
  };

  render() {
    const { image } = this.props;

    return (
      <Card className="image-card" raised centered onClick={this.handleClick}>
        <ResponsiveImage url={image.previewSrc} height={200} />
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
