import AlbumModel from './AlbumModel';

class CategoryModel {
  store;

  id;

  title;

  titleRus;

  titleEng;

  cover;

  albums;

  constructor(store, category) {
    this.store = store;
    this.id = category.id;
    this.title = category.title;
    this.titleRus = category.title_rus;
    this.titleEng = category.title_eng;
    this.cover = category.cover;
    if (category.albums) {
      this.albums = category.albums.map(album => new AlbumModel(this, album));
    }
  }
}

export default CategoryModel;
