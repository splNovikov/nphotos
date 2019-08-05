import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeView from './views/Home';
import AlbumsView from './views/Albums';
import AlbumView from './views/Album';
import AboutView from './views/About';
import ContactsView from './views/Contacts';

// todo: move paths to constants
const routes = (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path="/albums" component={AlbumsView} />
    <Route path="/albums/:id" component={AlbumView} />
    <Route path="/about" component={AboutView} />
    <Route path="/contacts" component={ContactsView} />
  </Switch>
);

export default routes;
