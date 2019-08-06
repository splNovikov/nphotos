import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import ImageCard from '../ImageCard';

class AlbumGrid extends PureComponent {
  static propTypes = {
    album: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string
        })
      )
    }).isRequired,
    onImageClick: PropTypes.func.isRequired
  };

  render() {
    const { album, onImageClick } = this.props;

    return (
      <Grid container columns={3}>
        {album.images.map((image, index) => (
          <Grid.Column key={image.id} mobile={16} tablet={8} computer={4}>
            <ImageCard image={image} index={index} onClick={onImageClick} />
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

export default AlbumGrid;
