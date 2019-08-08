import { observable, flow, configure } from 'mobx';

import aboutApi from '../api/about';

// todo: do we need to put it everywhere in Stores? Or put it somewhere once?
configure({ enforceActions: 'observed' });

export class AboutStore {
  @observable isFetching = false;

  @observable errors = [];

  @observable about = '';

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
