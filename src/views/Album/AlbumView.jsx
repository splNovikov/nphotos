import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Grid,
  Segment,
  Header,
  Modal,
  Image,
  Button,
  Icon
} from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';

import ImageCard from '../../components/ImageCard';

import './AlbumView.scss';

@inject(({ albumsStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
  isFetching: albumsStore.isFetching,
  getAlbum: albumsStore.album
}))
@observer
class AlbumView extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    intl: intlShape,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }).isRequired,
    fetchAlbum: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getAlbum: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.albumId = id;
    this.state = { modalOpen: false, selectedImage: {} };
  }

  componentDidMount() {
    const { getAlbum, fetchAlbum } = this.props;

    // fetch only if we don't have it already
    if (!getAlbum(this.albumId)) {
      fetchAlbum(this.albumId);
    }
  }

  handleClickImage = image => {
    this.setState({ modalOpen: true, selectedImage: image });
  };

  handleClose = () => {
    this.setState({ modalOpen: false, selectedImage: {} });
  };

  albumId;

  render() {
    const {
      isFetching,
      getAlbum,
      intl: { formatMessage }
    } = this.props;
    const album = getAlbum(this.albumId);
    const { modalOpen, selectedImage } = this.state;

    return (
      <Segment className="album-view" loading={isFetching}>
        {!album ? (
          <Header as="h2" className="album-title capitalize">
            {formatMessage({
              id: 'albumView.noImages',
              defaultMessage: 'No Images'
            })}
          </Header>
        ) : (
          <React.Fragment>
            <Header as="h2" className="album-title">
              {album.title}
            </Header>
            <Grid container columns={3}>
              {album.images.map(image => (
                <Grid.Column key={image.id} mobile={16} tablet={8} computer={4}>
                  <ImageCard image={image} onClick={this.handleClickImage} />
                </Grid.Column>
              ))}
            </Grid>
          </React.Fragment>
        )}
        <Modal open={modalOpen} onClose={this.handleClose}>
          <Modal.Content image>
            <Image
              src={selectedImage.src}
              wrapped
              ui={false}
              className="modal-image"
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose}>
              <Icon name="checkmark" />{' '}
              {formatMessage({
                id: 'common.close',
                defaultMessage: 'close'
              })}
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    );
  }
}

export default injectIntl(AlbumView);
