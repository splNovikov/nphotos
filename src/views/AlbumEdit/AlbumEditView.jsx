import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';

import './AlbumEditView.scss';

import ChooseFiles from '../../components/ChooseFiles';
import Grid from '../../components/Grid';
import userPermissions from '../../constants/userPermissions';
import albumHelper from '../helpers/albumHelper';

const LazyModalImage = lazy(() => import('./components/ModalImage'));
const acceptedFileTypes = process.env.UPLOAD_ACCEPTED_IMAGE_TYPES;
const maxUploadFiles = +process.env.MAX_UPLOAD_IMAGES || 50;

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
      modalOpened: false,
      selectedImages: []
    };

    this.albumId = id;
  }

  componentDidMount() {
    const { fetchAlbum } = this.props;

    fetchAlbum(this.albumId);
  }

  // this works, but we should put it in right place:
  // api.addAlbum({
  //   cover: fileList[0],
  //   categoryId: this.categoryId,
  //   titleEng,
  //   titleRus
  // });

  handleSelectImages = images => {
    this.setState({ selectedImages: images });
  };

  // todo [after release]: if upload has been failed - no error handling here
  handleUploadImages = async () => {
    const { selectedImages } = this.state;

    if (!selectedImages || !selectedImages.length) {
      return;
    }

    const { uploadImages, getAlbum } = this.props;

    const album = getAlbum(this.albumId);

    const uploadedImages = await uploadImages(selectedImages, this.albumId);

    if (uploadedImages && uploadedImages.length) {
      album.addImages(uploadedImages);
    }
  };

  isUploadValid = (files, maxFiles) =>
    files && files.length && files.length <= maxFiles;

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
      intl: { formatMessage },
      isFetching,
      getAlbum,
      user: { permissions },
      isUploading
    } = this.props;
    const { selectedImages, modalOpened, image } = this.state;
    const album = getAlbum(this.albumId);

    // todo [after release]: fix positive and negative button background styling
    // todo [after release]: cancel button with confirm
    // todo [after release]: fix performance - it renders multiple times
    return (
      <>
        <Segment
          className="album-edit-view no-borders fetching-min-height"
          loading={isFetching}
        >
          {permissions[userPermissions.canEditAlbum] ? (
            <Segment loading={isUploading} className="upload-images-wrapper">
              <ChooseFiles
                onSelect={this.handleSelectImages}
                acceptedFileTypes={acceptedFileTypes}
                maxUploadFiles={maxUploadFiles}
              />
              <Button
                type="submit"
                className="upload-btn"
                disabled={!this.isUploadValid(selectedImages, maxUploadFiles)}
                onClick={this.handleUploadImages}
              >
                {selectedImages && selectedImages.length
                  ? formatMessage(
                      {
                        id: 'uploadFiles.uploadNFiles',
                        defaultMessage: 'upload'
                      },
                      { length: selectedImages.length }
                    )
                  : formatMessage({
                      id: 'common.upload',
                      defaultMessage: 'upload'
                    })}
              </Button>
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
  intl: PropTypes.shape().isRequired,
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

export default injectIntl(AlbumEditView);
