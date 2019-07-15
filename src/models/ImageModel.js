class ImageModel {
  store;

  id;

  title;

  src;

  constructor(store, image) {
    this.store = store;
    this.id = image.id;
    this.title = image.title;
    this.src = image.path;
  }
}

export default ImageModel;
