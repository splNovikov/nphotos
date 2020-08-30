import { observable, action } from 'mobx';

class CommonStore {
  @observable isSidebarOpened = false;

  @observable isImagesCarouselOpened = false;

  @observable selectedCarouselImageIndex = undefined;

  @action.bound
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  @action.bound
  closeSidebar() {
    this.isSidebarOpened = false;
  }
}

export default new CommonStore();
