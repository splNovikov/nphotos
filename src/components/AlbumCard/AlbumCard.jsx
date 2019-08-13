import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

@observer
class AlbumCard extends React.Component {
  static propTypes = {
    album: PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string
    }).isRequired,
    onAlbumCardClick: PropTypes.func.isRequired
  };

  handleCardClick = () => {
    const { album, onAlbumCardClick } = this.props;

    return onAlbumCardClick(album);
  };

  render() {
    const { album } = this.props;

    return (
      <Card
        className="album-card"
        raised
        centered
        onClick={this.handleCardClick}
      >
        <ResponsiveImage url={album.cover} height={200} />
        <Card.Content>
          <Card.Header className="capitalize">{album.title}</Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default AlbumCard;
