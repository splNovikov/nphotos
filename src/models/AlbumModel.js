import ImageModel from './ImageModel';

class AlbumModel {
  store;

  id;

  title;

  images;

  constructor(store, album) {
    this.store = store;
    this.id = album.id;
    this.title = album.title;
    if (album.images) {
      this.images = album.images.map(image => new ImageModel(this, image));
    }
  }
}

export default AlbumModel;
