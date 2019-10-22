import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Grid } from 'semantic-ui-react';

import Card from '../Card';

// todo common Grid component
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

  handleCardClick = entity => {
    const {
      onImageClick,
      album: { images }
    } = this.props;
    const index = images.map(e => e.id).indexOf(entity.id);

    return onImageClick(index);
  };

  render() {
    const { album } = this.props;

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
              onCardClick={this.handleCardClick}
            />
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

export default AlbumGrid;
