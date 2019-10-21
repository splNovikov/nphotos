import AlbumModel from './AlbumModel';

class CategoryModel {
  store;

  id;

  title;

  cover;

  albums;

  constructor(store, category) {
    this.store = store;
    this.id = category.id;
    this.title = category.title;
    this.cover = category.cover;
    if (category.albums) {
      this.albums = category.albums.map(album => new AlbumModel(this, album));
    }
  }
}

export default CategoryModel;
