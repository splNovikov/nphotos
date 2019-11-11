import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import appRoutes from './constants/appRoutes';
// todo: all lazy
import HomeView from './views/Home';
import CategoryView from './views/Category';
import AlbumsView from './views/Albums';
import AlbumView from './views/Album';
import AboutView from './views/About';
import ContactsView from './views/Contacts';
import PriceListView from './views/PriceList';

const LazyCategoriesView = lazy(() => import('./views/Categories'));

// todo: new Component
const LoadingMessage = () => "I'm loading...";

const routes = (
  <Suspense fallback={<LoadingMessage />}>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path={appRoutes.categories} component={LazyCategoriesView} />
      <Route path={`${appRoutes.categories}/:id`} component={CategoryView} />

      <Route exact path={appRoutes.albums} component={AlbumsView} />
      <Route path={`${appRoutes.albums}/:id`} component={AlbumView} />

      <Route path={appRoutes.about} component={AboutView} />
      <Route path={appRoutes.contacts} component={ContactsView} />
      <Route path={appRoutes.priceList} component={PriceListView} />
    </Switch>
  </Suspense>
);

export default routes;
