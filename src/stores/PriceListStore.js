import { observable, flow } from 'mobx';

import { BaseStore } from './BaseStore';
import priceListApi from '../api/priceList';
import httpErrorHandler from '../utils/httpErrorHandler';

export class PriceListStore extends BaseStore {
  @observable errors = [];

  @observable priceList = [];

  fetchPriceList = () => this.flowFetchPriceList();

  flowFetchPriceList = flow(function* fetchPriceList() {
    this.debouncedToggleFetching(true);

    try {
      const { data: priceList } = yield priceListApi.getPriceList();

      this.priceList = priceList;
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.debouncedToggleFetching(false);
    }
  });
}

export default new PriceListStore();
