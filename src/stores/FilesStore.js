import { observable, flow } from 'mobx';

import filesApi from '../api/files';
import httpErrorHandler from '../utils/httpErrorHandler';

export class FilesStore {
  @observable isUploading = false;

  @observable errors = [];

  uploadImages = (images, albumId) => this.flowUploadImages(images, albumId);

  flowUploadImages = flow(function* uploadImages(images, albumId) {
    this.isUploading = true;
    try {
      yield filesApi.uploadImages(images, albumId);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isUploading = false;
    }
  });
}

export default new FilesStore();
