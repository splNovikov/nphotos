class ImageModel {
  store;

  id;

  title;

  src;

  previewSrc;

  constructor(store, image) {
    this.store = store;
    this.id = image.id;
    this.title = image.title;
    this.src = image.path;
    this.previewSrc = image.previewPath || image.path;
  }
}

export default ImageModel;
