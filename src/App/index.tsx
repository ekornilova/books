import React, { FC, Suspense, useEffect } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { routes as routesConfig } from '../routes';
import { store } from '../store';
import { DisplayNotification, NotificationsProvider } from '../Components/NotificationPopup';
import { useNotifications } from '../Components/NotificationPopup/ProviderNotification';
import { SETDICTIONARIES } from '../store/constants';
import { DictionaryI } from '../store/types';
import { getDictionaries } from '../utils/dictionaries/index';
import { genresMock, authorsMock, shopsMock } from '../utils/dictionaries/mock';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
  }
`;
const mapDispatchToProps = (dispatch: any) => {
  return {
    loadDictionaries: (data: DictionaryI) => dispatch({ type: SETDICTIONARIES, data }),
  };
};
const InnerApp = connect(
  null,
  mapDispatchToProps,
)(({ loadDictionaries }) => {
  const { handleAxiosError, handleAxiosSuccess } = useNotifications();
  useEffect(() => {
    getDictionaries(authorsMock, shopsMock, genresMock)
      .then(([authors, shops, genres]) => {
        handleAxiosSuccess('Perfect load');
        loadDictionaries({
          authors,
          shops,
          genres,
        } as DictionaryI);
      })
      .catch(handleAxiosError);
  }, []);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <DisplayNotification />
      <AppContent />
    </BrowserRouter>
  );
});

const AppContent: FC = () => {
  return (
    <Switch>
      <Suspense fallback={<h1>Still Loading…</h1>}>
        {routesConfig.map((props) => {
          const { name, path, Component, routes, redirect, exact } = props;
          return (
            <Route key={`${path}${name}`} path={path} exact={exact}>
              {redirect ? (
                <Redirect to={{ pathname: redirect }} />
              ) : (
                <Component name={name} routes={routes} />
              )}
            </Route>
          );
        })}
      </Suspense>
    </Switch>
  );
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <NotificationsProvider>
        <InnerApp />
      </NotificationsProvider>
    </Provider>
  );
};

export default App;
