import { configure } from 'mobx';

import aboutStore from './AboutStore';
import contactsStore from './ContactsStore';
import categoriesStore from './CategoriesStore';
import albumsStore from './AlbumsStore';
import commonStore from './CommonStore';
import priceListStore from './PriceListStore';

configure({ enforceActions: 'observed' });

const stores = {
  commonStore,
  categoriesStore,
  albumsStore,
  contactsStore,
  aboutStore,
  priceListStore
};

export default stores;
