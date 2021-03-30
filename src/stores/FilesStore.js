import { observable, flow } from 'mobx';

import imagesApi from '../api/images';
import httpErrorHandler from '../utils/httpErrorHandler';
import { BaseStore } from './BaseStore';

export class FilesStore extends BaseStore {
  @observable isUploading = false;

  @observable errors = [];

  uploadImages = (images, albumId) => this.flowUploadImages(images, albumId);

  deleteImage = (imageId, albumId) => this.flowDeleteImage(imageId, albumId);

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

  flowDeleteImage = flow(function* deleteImage(imageId, albumId) {
    this.debouncedToggleFetching(true);

    try {
      yield imagesApi.deleteImage(imageId, albumId);
      // todo: should update Albums store somehow
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.debouncedToggleFetching(false);
    }
  });
}

export default new FilesStore();
