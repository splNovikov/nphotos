import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

import './AlbumEditView.scss';

import UploadFiles from '../../components/UploadFiles';
import Grid from '../../components/Grid';
import userPermissions from '../../constants/userPermissions';
import albumHelper from '../helpers/albumHelper';

const LazyModalImage = lazy(() => import('./components/ModalImage'));
const acceptedFileTypes = process.env.UPLOAD_ACCEPTED_FILE_TYPES;

@inject(({ albumsStore, userStore, filesStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
  isFetching: albumsStore.isFetching,
  getAlbum: albumsStore.album,
  user: userStore.user,
  uploadImages: filesStore.uploadImages,
  isUploading: filesStore.isUploading
}))
@observer
class AlbumEditView extends Component {
  albumId;

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.state = {
      modalOpened: false
    };

    this.albumId = id;
  }

  componentDidMount() {
    const { fetchAlbum } = this.props;

    fetchAlbum(this.albumId);
  }

  handleUploadSubmit = async images => {
    const { uploadImages, getAlbum } = this.props;
    const album = getAlbum(this.albumId);

    const uploadedImages = await uploadImages(images, this.albumId);

    album.addImages(uploadedImages);
  };

  toggleModal = ({ id }) => {
    const { getAlbum } = this.props;
    const { images } = getAlbum(this.albumId);
    const image = images.find(i => i.id === id);

    this.setState(state => ({
      modalOpened: !state.modalOpened,
      image: !state.modalOpened && image
    }));
  };

  render() {
    const {
      isFetching,
      getAlbum,
      user: { permissions },
      isUploading
    } = this.props;
    const { modalOpened, image } = this.state;
    const album = getAlbum(this.albumId);

    // todo [after release]: fix positive and negative button background styling
    // todo [after release]: cancel button with confirm
    // todo [after release]: fix performance - it renders multiple times
    // todo: set max count of uploading files
    return (
      <>
        <Segment
          className="album-edit-view no-borders fetching-min-height"
          loading={isFetching}
        >
          {permissions[userPermissions.canEditAlbum] ? (
            <Segment loading={isUploading}>
              <UploadFiles
                onUploadSubmit={this.handleUploadSubmit}
                acceptedFileTypes={acceptedFileTypes}
              />
            </Segment>
          ) : null}

          {albumHelper.hasImages(album) ? (
            <Grid
              className="images-grid"
              onCardClick={this.toggleModal}
              elements={albumHelper.mapToGridEntity(album)}
              columns={4}
              imageHeight={200}
              circle={false}
              imagePadding={10}
            />
          ) : null}
        </Segment>
        {modalOpened ? (
          <LazyModalImage closeModal={this.toggleModal} image={image} />
        ) : null}
      </>
    );
  }
}

AlbumEditView.wrappedComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getAlbum: PropTypes.func.isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      [userPermissions.canEditAlbum]: PropTypes.bool
    })
  }).isRequired,
  uploadImages: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
};

export default AlbumEditView;
