import { action, observable } from 'mobx';

import AlbumModel from './AlbumModel';

class CategoryModel {
  store;

  id;

  title;

  titleRus;

  titleEng;

  cover;

  @observable
  albums;

  constructor(store, category) {
    this.store = store;
    this.id = category.id;
    this.title = category.title;
    this.titleRus = category.titleRus;
    this.titleEng = category.titleEng;
    this.cover = category.cover;
    if (category.albums) {
      this.albums = category.albums.map(album => new AlbumModel(this, album));
    }
  }

  @action
  updateCategory = ({ cover, titleRus, titleEng }) => {
    this.cover = cover;
    this.titleRus = titleRus;
    this.titleEng = titleEng;
  };
}

export default CategoryModel;
