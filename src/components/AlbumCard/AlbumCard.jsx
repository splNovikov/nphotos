import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card, Image } from 'semantic-ui-react';

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
      <Card className="album-card" role="none" onClick={this.handleCardClick}>
        <Image src={album.cover} wrapped ui={false} />
        <Card.Content>
          <Card.Header className="capitalize">{album.title}</Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default AlbumCard;
