import { observable, flow } from 'mobx';

import priceListApi from '../api/priceList';

export class PriceListStore {
  @observable isFetching = false;

  @observable errors = [];

  @observable priceList = [];

  fetchPriceList = () => this.flowFetchPriceList();

  flowFetchPriceList = flow(function* fetchPriceList() {
    this.isFetching = true;
    try {
      const { data: priceList } = yield priceListApi.getPriceList();

      this.priceList = priceList;
    } catch (error) {
      this.errors.push(error);
    } finally {
      this.isFetching = false;
    }
  });
}

export default new PriceListStore();
