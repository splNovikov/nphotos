import { observable, flow } from 'mobx';

import imagesApi from '../api/images';
import httpErrorHandler from '../utils/httpErrorHandler';

export class FilesStore {
  @observable isUploading = false;

  @observable errors = [];

  uploadImages = (images, albumId) => this.flowUploadImages(images, albumId);

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
}

export default new FilesStore();
