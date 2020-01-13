import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import appRoutes from './constants/appRoutes';
import userPermissions from './constants/userPermissions';
import LoadingFallback from './components/LoadingFallback';
import ProtectedRoute from './components/ProtectedRoute';

const LazyHomeView = lazy(() => import('./views/Home'));
const LazyCategoriesView = lazy(() => import('./views/Categories'));
const LazyCategoryView = lazy(() => import('./views/Category'));
const LazyCategoryEditView = lazy(() => import('./views/CategoryEdit'));
const LazyAlbumsView = lazy(() => import('./views/Albums'));
const LazyAlbumView = lazy(() => import('./views/Album'));
const LazyAlbumEditView = lazy(() => import('./views/AlbumEdit'));
const LazyAboutView = lazy(() => import('./views/About'));
const LazyContactsView = lazy(() => import('./views/Contacts'));
const LazyPriceListView = lazy(() => import('./views/PriceList'));

const routes = (
  <Suspense fallback={<LoadingFallback />}>
    <Switch>
      <Route exact path="/" component={LazyHomeView} />
      <Route exact path={appRoutes.categories} component={LazyCategoriesView} />
      <Route
        path={`${appRoutes.categories}/:id`}
        component={LazyCategoryView}
      />
      <ProtectedRoute
        path={`${appRoutes.categoryEdit}/:id`}
        component={LazyCategoryEditView}
        restriction={userPermissions.canEditCategory}
      />

      <Route exact path={appRoutes.albums} component={LazyAlbumsView} />
      <Route path={`${appRoutes.albums}/:id`} component={LazyAlbumView} />
      <ProtectedRoute
        path={`${appRoutes.albumEdit}/:id`}
        component={LazyAlbumEditView}
        restriction={userPermissions.canEditAlbum}
      />

      <Route path={appRoutes.about} component={LazyAboutView} />
      <Route path={appRoutes.contacts} component={LazyContactsView} />
      <Route path={appRoutes.priceList} component={LazyPriceListView} />
    </Switch>
  </Suspense>
);

export default routes;
