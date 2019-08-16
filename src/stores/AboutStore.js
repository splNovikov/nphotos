import { observable, flow } from 'mobx';

import aboutApi from '../api/about';

export class AboutStore {
  @observable isFetching = false;

  @observable errors = [];

  @observable about = [];

  fetchAbout = () => this.flowFetchAbout();

  flowFetchAbout = flow(function* fetchAbout() {
    this.isFetching = true;
    try {
      const { data: about } = yield aboutApi.getAbout();

      this.about = about;
    } catch (error) {
      this.errors.push(error);
    } finally {
      this.isFetching = false;
    }
  });
}

export default new AboutStore();
