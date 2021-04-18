import { action, observable } from 'mobx';

import ImageModel from './ImageModel';

class AlbumModel {
  store;

  id;

  title;

  imagesCount;

  @observable
  titleRus;

  @observable
  titleEng;

  @observable
  cover;

  @observable
  images;

  categories;

  constructor(store, album) {
    this.store = store;
    this.id = album.id;
    this.title = album.title;
    this.titleRus = album.titleRus;
    this.titleEng = album.titleEng;
    this.cover = album.cover;
    this.imagesCount = album.imagesCount;
    if (album.images) {
      this.images = album.images.map(image => new ImageModel(this, image));
    }
    if (album.categories) {
      this.categories = album.categories;
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

  @action
  deleteImage = imageId => {
    if (!imageId) {
      return;
    }

    this.images = this.images.reduce(
      (acc, image) => (image.id === imageId ? acc : [...acc, image]),
      []
    );
  };

  @action
  update = ({ prop, value }) => {
    this[prop] = value;
  };
}

export default AlbumModel;
