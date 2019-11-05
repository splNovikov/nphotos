import { observable, action } from 'mobx';

class CommonStore {
  @observable isSidebarOpened = false;

  @observable isImagesCarouselOpened = false;

  @observable selectedCarouselImageIndex = undefined;

  @observable user = {
    // todo: should be received from backend
    permissions: {
      canAddImages: true
    }
  };

  @action.bound
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  @action.bound
  closeSidebar() {
    this.isSidebarOpened = false;
  }

  @action.bound
  toggleImagesCarousel(isOpened, selectedImageIndex) {
    this.selectedCarouselImageIndex = selectedImageIndex;

    if (typeof isOpened === 'boolean') {
      this.isImagesCarouselOpened = isOpened;
      return;
    }
    this.isImagesCarouselOpened = !this.isImagesCarouselOpened;
  }
}

export default new CommonStore();
