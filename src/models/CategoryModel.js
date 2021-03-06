import { action, computed, observable } from 'mobx';

import albumsStore from '../stores/AlbumsStore';

class CategoryModel {
  store;

  id;

  title;

  albumsCount;

  @observable
  titleRus;

  @observable
  titleEng;

  @observable
  cover;

  albumsIds;

  @computed
  get albums() {
    return (
      this.albumsIds &&
      this.albumsIds.reduce(
        (acc, albumId) => [
          ...acc,
          albumsStore.albums.find(a => a.id === albumId)
        ],
        []
      )
    );
  }

  constructor(store, category) {
    this.store = store;
    this.id = category.id;
    this.title = category.title;
    this.titleRus = category.titleRus;
    this.titleEng = category.titleEng;
    this.cover = category.cover;
    this.albumsCount = category.albumsCount;
    if (category.albums) {
      this.albumsIds = category.albums.map(album => album.id);
    }
  }

  @action
  update = ({ prop, value }) => {
    this[prop] = value;
  };
}

export default CategoryModel;
