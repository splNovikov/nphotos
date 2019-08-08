import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import App from './components/App';
import { withTracker, getLanguageMessages } from './utils';
import * as serviceWorker from './serviceWorker';
import albumsStore from './stores/AlbumsStore';
import contactsStore from './stores/ContactsStore';
import commonStore from './stores/CommonStore';
import aboutStore from './stores/AboutStore';

import './style/index.scss';

addLocaleData([...en, ...ru]);

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const { language, messages } = getLanguageMessages();
const stores = {
  routingStore,
  commonStore,
  albumsStore,
  contactsStore,
  aboutStore
};
const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <IntlProvider locale={language} messages={messages}>
      <Router history={history}>
        <Route component={withTracker(App)} />
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
