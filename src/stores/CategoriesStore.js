import { computed, observable, flow } from 'mobx';

import categoriesApi from '../api/categories';
import CategoryModel from '../models/CategoryModel';
import httpErrorHandler from '../utils/httpErrorHandler';

export class CategoriesStore {
  @observable isFetching = false;

  @observable errors = [];

  // categories, loaded all for once
  @observable categories = [];

  // fetched categories one by one are registered there:
  @observable categoriesRegistry = {};

  @computed get category() {
    return id => this.categoriesRegistry[id];
  }

  fetchCategories = () => this.flowFetchCategories();

  fetchCategory = id => this.flowFetchCategory(id);

  flowFetchCategories = flow(function* fetchCategories() {
    this.isFetching = true;
    try {
      const { data: categories } = yield categoriesApi.getCategories();

      this.categories = categories.map(
        category => new CategoryModel(this, category)
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
}

export default new CategoriesStore();
