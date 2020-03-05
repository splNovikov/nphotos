import { action, computed, observable, flow } from 'mobx';

import categoriesApi from '../api/categories';
import CategoryModel from '../models/CategoryModel';
import httpErrorHandler from '../utils/httpErrorHandler';
import albumsStore from './AlbumsStore';

export class CategoriesStore {
  @observable isFetching = false;

  @observable errors = [];

  @observable categoriesRegistry = {};

  @computed get categories() {
    return Object.values(this.categoriesRegistry);
  }

  @computed get category() {
    return id => this.categoriesRegistry[id];
  }

  @action
  updateCategoriesRegistry = categories => {
    const reducedCategories = categories.reduce(
      (acc, category) => ({
        ...acc,
        [category.id]: new CategoryModel(this, category)
      }),
      {}
    );

    this.updateAlbumsRegistry(categories);

    this.categoriesRegistry = {
      ...this.categoriesRegistry,
      ...reducedCategories
    };
  };

  updateAlbumsRegistry = categories => {
    const albums = categories.reduce(
      (acc, category) => (category.albums ? [...acc, ...category.albums] : acc),
      []
    );

    if (albums.length) {
      albumsStore.updateAlbumsRegistry(albums);
    }
  };

  fetchCategories = () => this.flowFetchCategories();

  fetchCategory = id => this.flowFetchCategory(id);

  updateCategory = (id, category) => this.flowUpdateCategory(id, category);

  createCategory = category => this.flowCreateCategory(category);

  flowFetchCategories = flow(function* fetchCategories() {
    this.isFetching = true;
    try {
      const { data: categories } = yield categoriesApi.getCategories();

      this.updateCategoriesRegistry(categories);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowFetchCategory = flow(function* fetchCategory(id) {
    this.isFetching = true;
    try {
      const { data: category } = yield categoriesApi.getCategory(id);

      this.updateCategoriesRegistry([category]);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowUpdateCategory = flow(function* updateCategory(categoryId, category) {
    this.isFetching = true;

    try {
      const { data: updatedCategory } = yield categoriesApi.updateCategory(
        categoryId,
        category
      );

      this.updateCategoriesRegistry([updatedCategory]);
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowCreateCategory = flow(function* createCategory(category) {
    this.isFetching = true;

    try {
      const { data: createdCategory } = yield categoriesApi.createCategory(
        category
      );

      this.updateCategoriesRegistry([createdCategory]);

      return createdCategory;
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);

      return error;
    } finally {
      this.isFetching = false;
    }
  });
}

export default new CategoriesStore();
