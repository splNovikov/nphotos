import { action, computed, observable, flow } from 'mobx';

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

  @action
  updateAlbumsRegistry = (albums = []) => {
    const reducedAlbums = albums.reduce(
      (acc, a) => ({
        ...acc,
        [a.id]: new AlbumModel(this, a)
      }),
      {}
    );

    this.albumsRegistry = {
      ...this.albumsRegistry,
      ...reducedAlbums
    };
  };

  fetchAlbums = () => this.flowFetchAlbums();

  fetchAlbum = id => this.flowFetchAlbum(id);

  updateAlbum = album => this.flowUpdateAlbum(album);

  createAlbum = album => this.flowCreateAlbum(album);

  flowFetchAlbums = flow(function* fetchAlbums() {
    this.isFetching = true;
    try {
      const { data: albums } = yield albumsApi.getAlbums();

      this.updateAlbumsRegistry(albums);
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

      this.updateAlbumsRegistry([album]);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowUpdateAlbum = flow(function* updateAlbum(albumModel) {
    this.isFetching = true;

    try {
      const { data: updatedAlbum } = yield albumsApi.updateAlbum({
        id: albumModel.id,
        cover: albumModel.cover,
        titleRus: albumModel.titleRus,
        titleEng: albumModel.titleEng
      });

      this.updateAlbumsRegistry([updatedAlbum]);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowCreateAlbum = flow(function* createAlbum(albumModel) {
    this.isFetching = true;

    try {
      const { data: createdAlbum } = yield albumsApi.createAlbum({
        categoryId: albumModel.categoryId,
        cover: albumModel.cover,
        titleRus: albumModel.titleRus,
        titleEng: albumModel.titleEng
      });

      this.updateAlbumsRegistry([createdAlbum]);

      return createdAlbum;
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);

      return error;
    } finally {
      this.isFetching = false;
    }
  });
}

export default new AlbumsStore();
