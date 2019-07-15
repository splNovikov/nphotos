import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card, Image } from 'semantic-ui-react';

@observer
class AlbumCard extends React.Component {
  static propTypes = {
    album: PropTypes.shape({
      title: PropTypes.string
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
      <Card role="none" onClick={this.handleCardClick}>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{album.title}</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default AlbumCard;
