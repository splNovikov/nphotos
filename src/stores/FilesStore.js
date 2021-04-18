import { observable, flow } from 'mobx';

import imagesApi from '../api/images';
import httpErrorHandler from '../utils/httpErrorHandler';
import { BaseStore } from './BaseStore';
import albumsStore from './AlbumsStore';

export class FilesStore extends BaseStore {
  @observable isUploading = false;

  @observable errors = [];

  uploadImages = (images, albumId) => this.flowUploadImages(images, albumId);

  deleteImage = (image, albumId) => this.flowDeleteImage(image, albumId);

  flowUploadImages = flow(function* uploadImages(images, albumId) {
    let uploadedImages;
    this.isUploading = true;

    try {
      uploadedImages = yield imagesApi.uploadImages(images, albumId);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isUploading = false;
    }

    return uploadedImages && uploadedImages.data;
  });

  flowDeleteImage = flow(function* deleteImage(image, albumId) {
    this.debouncedToggleFetching(true);

    try {
      yield imagesApi.deleteImage(image.id, albumId);

      albumsStore.deleteImageFromAlbumsRegistry(albumId, image.id);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.debouncedToggleFetching(false);
    }
  });
}

export default new FilesStore();
