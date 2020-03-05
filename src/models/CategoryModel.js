import { action, computed } from 'mobx';

import albumsStore from '../stores/AlbumsStore';

class CategoryModel {
  store;

  id;

  title;

  titleRus;

  titleEng;

  cover;

  albumsIds;

  @computed get albums() {
    return this.albumsIds.reduce(
      (acc, albumId) => [
        ...acc,
        albumsStore.albums.find(a => a.id === albumId)
      ],
      []
    );
  }

  constructor(store, category) {
    this.store = store;
    this.id = category.id;
    this.title = category.title;
    this.titleRus = category.titleRus;
    this.titleEng = category.titleEng;
    this.cover = category.cover;
    if (category.albums) {
      this.albumsIds = category.albums.map(album => album.id);
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
