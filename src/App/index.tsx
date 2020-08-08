import React, { FC, Suspense } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { routes as routesConfig } from '../routes';
import { store } from '../store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;

  }
`;

const InnerApp: FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppContent />
    </BrowserRouter>
  );
};

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
      <InnerApp />
    </Provider>
  );
};

export default App;
