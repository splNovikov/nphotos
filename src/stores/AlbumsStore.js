import { computed, observable, flow, configure } from 'mobx';

import albumsApi from '../api/albums';
import AlbumModel from '../models/AlbumModel';

// todo: do we need to put it everywhere in Stores? Or put it somewhere once?
configure({ enforceActions: 'observed' });

export class AlbumsStore {
  @observable isFetching = false;

  @observable errors = [];

  @observable albumsRegistry = {};

  @computed get album() {
    return id => this.albumsRegistry[id];
  }

  fetchAlbum = id => {
    return this.flowFetchAlbum(id);
  };

  flowFetchAlbum = flow(function* fetchAlbum(id) {
    this.isFetching = true;
    try {
      const { data: album } = yield albumsApi.getAlbum(id);

      this.albumsRegistry = {
        ...this.albumsRegistry,
        [album.id]: new AlbumModel(this, album)
      };
    } catch (error) {
      this.errors.push(error);
    } finally {
      this.isFetching = false;
    }
  });
}

export default new AlbumsStore();
