import React from 'react';
import { Route, Switch } from 'react-router-dom';

import appRoutes from './constants/appRoutes';
import HomeView from './views/Home';
import CategoriesView from './views/Categories';
import CategoryView from './views/Category';
import AlbumsView from './views/Albums';
import AlbumView from './views/Album';
import AboutView from './views/About';
import ContactsView from './views/Contacts';
import PriceListView from './views/PriceList';

const routes = (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path={appRoutes.categories} component={CategoriesView} />
    <Route path={`${appRoutes.categories}/:id`} component={CategoryView} />

    <Route exact path={appRoutes.albums} component={AlbumsView} />
    <Route path={`${appRoutes.albums}/:id`} component={AlbumView} />

    <Route path={appRoutes.about} component={AboutView} />
    <Route path={appRoutes.contacts} component={ContactsView} />
    <Route path={appRoutes.priceList} component={PriceListView} />
  </Switch>
);

export default routes;
