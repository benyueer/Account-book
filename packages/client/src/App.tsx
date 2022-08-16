import { ApolloProvider } from '@apollo/client';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Test from './components/test';
import Auth from './layout/Auth';
import { IRoute, routes } from './router/config';
import { client } from './utils/apolloClient';
import store from './store';

function App() {
  console.log('app')
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Suspense fallback={<p>loading...</p>}>
          <Router>
            <Switch>
              {
                routes.map((route: IRoute) => {
                  const { path, component } = route
                  return <Route key={path} path={path} component={component}></Route>
                })
              }
              <Redirect to="/main"></Redirect>
            </Switch>
          </Router>
        </Suspense>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
