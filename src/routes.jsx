import React from 'react';
import { Route, Switch } from 'react-router-dom';

import appRoutes from './constants/appRoutes';
import HomeView from './views/Home';
import AlbumsView from './views/Albums';
import AlbumView from './views/Album';
import AboutView from './views/About';
import ContactsView from './views/Contacts';

const routes = (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path={appRoutes.albums} component={AlbumsView} />
    <Route path={`${appRoutes.albums}/:id`} component={AlbumView} />
    <Route path={appRoutes.about} component={AboutView} />
    <Route path={appRoutes.contacts} component={ContactsView} />
  </Switch>
);

export default routes;
