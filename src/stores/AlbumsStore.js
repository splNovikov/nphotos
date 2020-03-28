import { action, computed, observable, flow } from 'mobx';

import { BaseStore } from './BaseStore';
import albumsApi from '../api/albums';
import AlbumModel from '../models/AlbumModel';
import httpErrorHandler from '../utils/httpErrorHandler';

export class AlbumsStore extends BaseStore {
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
    this.debouncedToggleFetching(true);

    try {
      const { data: albums } = yield albumsApi.getAlbums();

      this.updateAlbumsRegistry(albums);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.debouncedToggleFetching(false);
    }
  });

  flowFetchAlbum = flow(function* fetchAlbum(id) {
    this.debouncedToggleFetching(true);

    try {
      const { data: album } = yield albumsApi.getAlbum(id);

      this.updateAlbumsRegistry([album]);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.debouncedToggleFetching(false);
    }
  });

  flowUpdateAlbum = flow(function* updateAlbum(albumModel) {
    this.debouncedToggleFetching(true);

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
      this.debouncedToggleFetching(false);
    }
  });

  flowCreateAlbum = flow(function* createAlbum(albumModel) {
    this.debouncedToggleFetching(true);

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
      this.debouncedToggleFetching(false);
    }
  });
}

export default new AlbumsStore();
