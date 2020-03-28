import { observable, flow } from 'mobx';

import { BaseStore } from './BaseStore';
import aboutApi from '../api/about';
import httpErrorHandler from '../utils/httpErrorHandler';

export class AboutStore extends BaseStore {
  @observable errors = [];

  @observable about = [];

  fetchAbout = () => this.flowFetchAbout();

  flowFetchAbout = flow(function* fetchAbout() {
    this.debouncedToggleFetching(true);

    try {
      const { data: about } = yield aboutApi.getAbout();

      this.about = about;
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.debouncedToggleFetching(false);
    }
  });
}

export default new AboutStore();
