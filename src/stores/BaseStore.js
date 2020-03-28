import { action, observable } from 'mobx';
import { debounce } from '../utils';

export class BaseStore {
  @observable isFetching = false;

  @action
  toggleIsFetching = val => {
    this.isFetching = val;
  };

  debouncedToggleFetching = debounce(this.toggleIsFetching, 300);
}

export default new BaseStore();
