import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { IntlProvider } from 'react-intl';
// import en from 'react-intl/locale-data/en';
// import ru from 'react-intl/locale-data/ru';

import App from './components/App';
import { withTracker, getLanguageMessages } from './utils';
import * as serviceWorker from './serviceWorker';
import customStores from './stores';

import './style/index.scss';

// todo: do we need addLocalData?
// https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis
// addLocaleData([...en, ...ru]);

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const { language, messages } = getLanguageMessages();
const stores = {
  routingStore,
  ...customStores
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

// fix for issue on iphone/safari, when sidebar is not closing
// https://github.com/Semantic-Org/Semantic-UI-React/pull/1833#issuecomment-313713611
if ('ontouchstart' in document.documentElement) {
  document.body.style.cursor = 'pointer';
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
