import ImageModel from './ImageModel';

class AlbumModel {
  store;

  id;

  title;

  cover;

  images;

  constructor(store, album) {
    this.store = store;
    this.id = album.id;
    this.title = album.title;
    this.cover = album.cover;
    if (album.images) {
      this.images = album.images.map(image => new ImageModel(this, image));
    }
  }
}

export default AlbumModel;
