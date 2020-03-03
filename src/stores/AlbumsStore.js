import { computed, observable, flow } from 'mobx';

import albumsApi from '../api/albums';
import AlbumModel from '../models/AlbumModel';
import httpErrorHandler from '../utils/httpErrorHandler';

export class AlbumsStore {
  @observable isFetching = false;

  @observable errors = [];

  @observable albumsRegistry = {};

  @computed get albums() {
    return Object.values(this.albumsRegistry);
  }

  @computed get album() {
    return id => this.albumsRegistry[id];
  }

  fetchAlbums = () => this.flowFetchAlbums();

  fetchAlbum = id => this.flowFetchAlbum(id);

  createAlbum = album => this.flowCreateAlbum(album);

  flowFetchAlbums = flow(function* fetchAlbums() {
    this.isFetching = true;
    try {
      const { data: albums } = yield albumsApi.getAlbums();

      this.albumsRegistry = albums.reduce(
        (acc, album) => ({ ...acc, [album.id]: new AlbumModel(this, album) }),
        {}
      );
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowFetchAlbum = flow(function* fetchAlbum(id) {
    this.isFetching = true;
    try {
      const { data: album } = yield albumsApi.getAlbum(id);

      this.updateAlbumsRegistry(album);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowCreateAlbum = flow(function* createAlbum(album) {
    this.isFetching = true;

    try {
      const { data: createdAlbum } = yield albumsApi.createAlbum(album);

      this.updateAlbumsRegistry(createdAlbum);

      return createdAlbum;
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);

      return error;
    } finally {
      this.isFetching = false;
    }
  });

  updateAlbumsRegistry = album => {
    this.albumsRegistry = {
      ...this.albumsRegistry,
      [album.id]: new AlbumModel(this, album)
    };
  };
}

export default new AlbumsStore();
