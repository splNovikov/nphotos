import { computed, observable, flow } from 'mobx';

import categoriesApi from '../api/categories';
import CategoryModel from '../models/CategoryModel';
import httpErrorHandler from '../utils/httpErrorHandler';

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

  fetchCategories = () => this.flowFetchCategories();

  fetchCategory = id => this.flowFetchCategory(id);

  updateCategory = (id, category) => this.flowUpdateCategory(id, category);

  flowFetchCategories = flow(function* fetchCategories() {
    this.isFetching = true;
    try {
      const { data: categories } = yield categoriesApi.getCategories();

      this.categoriesRegistry = categories.reduce(
        (acc, category) => ({
          ...acc,
          [category.id]: new CategoryModel(this, category)
        }),
        {}
      );
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

      this.categoriesRegistry = {
        ...this.categoriesRegistry,
        [category.id]: new CategoryModel(this, category)
      };
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });

  flowUpdateCategory = flow(function* updateCategory(categoryId, category) {
    let updatedCategory;

    this.isFetching = true;

    try {
      updatedCategory = yield categoriesApi.updateCategory(
        categoryId,
        category
      );
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isUploading = false;
    }

    return updatedCategory && updatedCategory.data;
  });
}

export default new CategoriesStore();
