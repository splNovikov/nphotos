import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Grid } from 'semantic-ui-react';

import Card from '../Card';

@observer
class AlbumGrid extends Component {
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
        {album.images.map(image => (
          <Grid.Column key={image.id} mobile={16} tablet={8} computer={4}>
            <Card
              entity={{
                ...image,
                cover: image.previewSrc,
                description: image.title,
                title: undefined
              }}
              onCardClick={onImageClick}
            />
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

export default AlbumGrid;
