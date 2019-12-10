import { action, observable } from 'mobx';

import ImageModel from './ImageModel';

class AlbumModel {
  store;

  id;

  title;

  cover;

  @observable
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

  @action
  addImages = images => {
    if (!images || !images.length) {
      return;
    }
    this.images = [
      ...this.images,
      ...images.map(image => new ImageModel(this, image))
    ];
  };
}

export default AlbumModel;
